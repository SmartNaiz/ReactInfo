import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import moment from "moment";
import {
  usersCollection,
  reviewsCollection,
  messagesCollection,
  flowMeterCollection,
  sanCollection,
  WorkedTimeCollection,
} from "../utils/fbase";
import { transpose } from "../utils/needFunctions";
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const registerUser = async ({ email, password, name, lastname }) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { user } = response;

    const userProfile = {
      uid: user.uid,
      email: email,
      name: name,
      lastname: lastname,
      role: 1,
    };

    await usersCollection.doc(user.uid).set(userProfile);
    firebase.auth().currentUser.sendEmailVerification(null);
    return { isAuth: true, user: userProfile };
  } catch (error) {
    return { error: error.message };
  }
};

export const loginUser = ({ email, password }) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      return usersCollection
        .doc(response.user.uid)
        .get()
        .then((snapshot) => {
          return { isAuth: true, user: snapshot.data() };
        });
    })
    .catch((error) => {
      return { error: error.message };
    });

export const autoSignIn = () =>
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersCollection
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            resolve({ isAuth: true, user: snapshot.data() });
          });
      } else {
        resolve({ isAuth: false, user: null });
      }
    });
  });

export const logoutUser = () => firebase.auth().signOut();

export const updateProfile = (formData, isEmailChanged) => {
  const collection = usersCollection.doc(formData.uid);
  const updateDocument = () =>
    collection
      .update(formData)
      .then(() =>
        collection
          .get()
          .then((snapshot) => ({ isAuth: true, user: snapshot.data() }))
      );

  if (isEmailChanged) {
    let getUser = firebase.auth().currentUser;
    getUser.updateEmail(formData.email);
    return updateDocument();
  } else {
    return updateDocument();
  }
};

export const addReview = (data, user) =>
  reviewsCollection
    .add({
      ...data,
      createdAt: serverTimestamp(),
      rating: parseInt(data.rating),
      public: parseInt(data.public),
      ownerData: {
        ownerId: user.uid,
        name: `${user.name} ${user.lastname}`,
      },
    })
    .then((docRef) => {
      return docRef.id;
    });

export const getReviews = (limit) =>
  reviewsCollection
    .orderBy("createdAt")
    .limit(limit)
    .get()
    .then((snapshot) => {
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { posts: reviews, lastVisible: lastVisible };
    });

export const loadMoreReviews = (limit, reviews) => {
  let posts = [...reviews.posts];
  let lastVisible = reviews.lastVisible;

  if (lastVisible) {
    return reviewsCollection
      .orderBy("createdAt")
      .startAfter(lastVisible)
      .limit(limit)
      .get()
      .then((snapshot) => {
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        const newReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return { posts: [...posts, ...newReviews], lastVisible };
      });
  } else {
    console.log("no more posts");
    return { posts, lastVisible };
  }
};

export const editReview = (data, id) =>
  reviewsCollection
    .doc(id)
    .update(data)
    .then(() => {
      return getReviewById(id);
    });

export const getReviewById = async (id) => {
  try {
    const snapshot = await reviewsCollection.doc(id).get();
    const data = snapshot.data();

    const url = await firebase
      .storage()
      .ref(`reviews/${data.img}`)
      .getDownloadURL();
    return { ...data, downloadUrl: url };
  } catch (error) {
    return null;
  }
};

export const fetchPosts = (limit = 3, where = null) => {
  return new Promise((resolve, reject) => {
    let query = reviewsCollection.where("public", "==", 1);

    if (where) {
      query = query.where(where[0], where[1], where[2]);
    } else {
      query = query.orderBy("createdAt");
    }

    query
      .limit(limit)
      .get()
      .then((snapshot) => {
        const post = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        resolve(post);
      });
  });
};

export const sendContact = (data) => {
  return messagesCollection
    .add({
      ...data,
      createdAt: serverTimestamp(),
    })
    .then((docRef) => {
      return docRef.id;
    });
};

// =============Report Data================================

export const getWaterFlow = (startDate, endDate) => {
  return flowMeterCollection
    .where("UserId", "==", "TSMIN")
    .where("created", ">=", startDate)
    .where("created", "<=", endDate)
    .orderBy("created")
    .get()
    .then((snapshot) => {
      const { docs } = snapshot;
      const flowList = docs.map((doc, i) => {
        const { GX1FMT, GX2FMT, APWFMT, PWFMT, ERFMT, created } = doc.data();
        return [
          GX1FMT,
          GX2FMT,
          APWFMT,
          PWFMT,
          ERFMT,
          moment.unix(created.seconds).format("YYYY/MM/DD HH:mm:ss"),
        ];
      });

      const startedDate = flowList[0][5];
      const endedDate = flowList[1][5];
      const idNum = "№";
      const location = "Байршил";
      const measuredValue = "Усны зарцуулалт";

      const excelData = [
        {
          [idNum]: 1,
          [location]: "Гүний худаг 1",
          [endedDate]: flowList[1][0],
          [startedDate]: flowList[0][0],
          [measuredValue]: flowList[1][0] - flowList[0][0],
        },
        {
          [idNum]: 2,
          [location]: "Гүний худаг 2",
          [endedDate]: flowList[1][1],
          [startedDate]: flowList[0][1],
          [measuredValue]: flowList[1][1] - flowList[0][1],
        },
        {
          [idNum]: 3,
          [location]: "Ахуйн цэвэр ус",
          [endedDate]: flowList[1][2],
          [startedDate]: flowList[0][2],
          [measuredValue]: flowList[1][2] - flowList[0][2],
        },
        {
          [idNum]: 4,
          [location]: "Цэвэр ус",
          [endedDate]: flowList[1][3],
          [startedDate]: flowList[0][3],
          [measuredValue]: flowList[1][3] - flowList[0][3],
        },
        {
          [idNum]: 5,
          [location]: "Эргэлтийн ус",
          [endedDate]: flowList[1][4],
          [startedDate]: flowList[0][4],
          [measuredValue]: flowList[1][4] - flowList[0][4],
        },
      ];
      const tableData = [
        [
          1,
          "Гүний худаг 1",
          flowList[1][0],
          flowList[0][0],
          flowList[1][0] - flowList[0][0],
        ],
        [
          2,
          "Гүний худаг 2",
          flowList[1][1],
          flowList[0][1],
          flowList[1][1] - flowList[0][1],
        ],
        [
          3,
          "Ахуйн цэвэр ус",
          flowList[1][2],
          flowList[0][2],
          flowList[1][2] - flowList[0][2],
        ],
        [
          4,
          "Цэвэр ус",
          flowList[1][3],
          flowList[0][3],
          flowList[1][3] - flowList[0][3],
        ],
        [
          5,
          "Эргэлтийн ус",
          flowList[1][4],
          flowList[0][4],
          flowList[1][4] - flowList[0][4],
        ],
      ];
      const charData = [
        flowList[1][0] - flowList[0][0],
        flowList[1][1] - flowList[0][1],
        flowList[1][2] - flowList[0][2],
        flowList[1][3] - flowList[0][3],
        flowList[1][4] - flowList[0][4],
      ];
      return { startedDate, endedDate, tableData, excelData, charData };
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getWaterSan = (startDate, endDate) => {
  return sanCollection
    .where("UserId", "==", "TSMIN")
    .where("created", ">=", startDate)
    .where("created", "<=", endDate)
    .orderBy("created")
    .get()
    .then((snapshot) => {
      const { docs } = snapshot;
      const sanList = docs.map((doc, i) => {
        const {
          UserId,
          created,
          APWsan,
          ASHsan,
          ERsan1,
          ERsan2,
          URsan,
          PWsan,
        } = doc.data();
        return [
          i + 1,
          moment.unix(created.seconds).format("YYYY/MM/DD HH:mm:ss"),
          UserId,
          ASHsan,
          URsan,
          APWsan,
          PWsan,
          ERsan1,
          ERsan2,
        ];
      });
      transpose(sanList);
      const chartData = sanList.slice(0, 9);
      return { startDate, endDate, chartData };
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getWorkedTime = (startDate, endDate) => {
  return WorkedTimeCollection.where("UserId", "==", "TSMIN")
    .where("created", "==", startDate)
    .where("created", "<=", endDate)
    .orderBy("created")
    .get()
    .then((snapshot) => {
      const { docs } = snapshot;
      const dataList = docs.map((doc, i) => {
        const {
          UserId,
          created,
          APWvlvTime,
          ASHnss1Time,
          ASHnss2Time,
          ERnss1Time,
          ERnss2Time,
          GX1PmpTime,
          GX2PmpTime,
          PWnss1Time,
          URnss1Time,
          URnss2Time,
        } = doc.data();
        return {
          id: i + 1,
          created: moment.unix(created.seconds).format("YYYY/MM/DD HH:mm:ss"),
          APWvlv: APWvlvTime.APWvlvH * APWvlvTime.APWvlvM,
          ASHnss1: ASHnss1Time.ASHnss1H * ASHnss1Time.ASHnss1M,
          ASHnss2: ASHnss2Time.ASHnss2H * ASHnss2Time.ASHnss2M,
          ERnss1: ERnss1Time.ERnss1H * ERnss1Time.ERnss1M,
          ERnss2: ERnss2Time.ERnss2H * ERnss2Time.ERnss2M,
          GX1Pmp: GX1PmpTime.GX1PmpH * GX1PmpTime.GX1PmpM,
          GX2Pmp: GX2PmpTime.GX2PmpH * GX2PmpTime.GX2PmpM,
          PWnss1: PWnss1Time.PWnss1H * PWnss1Time.PWnss1M,
          URnss1: URnss1Time.URnss1H * URnss1Time.URnss1M,
          URnss2: URnss2Time.URnss2H * URnss2Time.URnss2M,
        };
      });
      console.log("datalist", dataList);
      return dataList;
    })
    .catch((error) => {
      console.log(error);
    });
};
