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
  alarmCollection,
  PumpCtStCollection,
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

export const getWaterFlow = (startDate, endDate, userId) => {
  return flowMeterCollection
    .where("UserId", "==", userId)
    .where("created", ">=", startDate)
    .where("created", "<=", endDate)
    .orderBy("created")
    .get()
    .then((snapshot) => {
      const { docs } = snapshot;
      const flowList = docs.map((doc, i) => {
        const { created, FlowMeter } = doc.data();
        return {
          created: moment.unix(created.seconds).format("YYYY/MM/DD HH:mm:ss"),
          FlowMeter,
        };
      });
      return flowList;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getWaterSan = (startDate, endDate, userId) => {
  return sanCollection
    .where("UserId", "==", userId)
    .where("created", ">=", startDate)
    .where("created", "<=", endDate)
    .orderBy("created")
    .get()
    .then((snapshot) => {
      const { docs } = snapshot;
      const sanList = docs.map((doc, i) => {
        const { created, San } = doc.data();
        return {
          created: moment.unix(created.seconds).format("YYYY/MM/DD HH:mm:ss"),
          San,
        };
      });
      // transpose(sanList);
      // const chartData = sanList.slice(0, 9);
      return sanList;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getWorkedTime = (startDate, endDate, userId) => {
  return WorkedTimeCollection.where("UserId", "==", userId)
    .where("created", "==", startDate)
    .where("created", "<=", endDate)
    .orderBy("created")
    .get()
    .then((snapshot) => {
      const { docs } = snapshot;
      const dataList = docs.map((doc, i) => {
        const { UserId, created, WorkedTime } = doc.data();
        return {
          id: i + 1,
          created: moment.unix(created.seconds).format("YYYY/MM/DD HH:mm:ss"),
          WorkedTime,
        };
      });
      return dataList;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getWaterAlarm = (startDate, endDate, userId) => {
  return alarmCollection
    .where("UserId", "==", userId)
    .where("created", ">=", startDate)
    .where("created", "<=", endDate)
    .orderBy("created")
    .get()
    .then((snapshot) => {
      const { docs } = snapshot;
      const AlarmList = docs.map((doc, i) => {
        const { created, idEQ, idAL } = doc.data();
        return {
          id: i + 1,
          created: moment.unix(created.seconds).format("YYYY/MM/DD HH:mm:ss"),
          idEQ,
          idAL,
        };
      });
      return AlarmList;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPumpCtSt = (startDate, endDate, userId) => {
  return PumpCtStCollection.where("UserId", "==", userId)
    .where("created", ">=", startDate)
    .where("created", "<=", endDate)
    .orderBy("created")
    .get()
    .then((snapshot) => {
      const { docs } = snapshot;
      const CtStList = docs.map((doc, i) => {
        const { created, idEQ, CtSt } = doc.data();
        return {
          id: i + 1,
          created: moment.unix(created.seconds).format("YYYY/MM/DD HH:mm:ss"),
          idEQ,
          CtSt,
        };
      });
      return CtStList;
    })
    .catch((error) => {
      console.log(error);
    });
};
