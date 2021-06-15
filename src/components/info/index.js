import React from "react";
import Badge from "react-bootstrap/Badge";
import css from "./style.module.css";
const Info = () => {
  return (
    <>
      <div className={css.ontslog}>
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-sm-4">
            <div className={css.neg}>
              <Badge variant="info">
                <h5>Ажиллах хүчний хэмнэлт</h5>
              </Badge>

              <ul>
                <br />
                <li>Ажилтан үйлдвэрийн осолд өртөх хувь буурна</li>
                <li>Санхүүгийн хэмнэлт бий болон</li>
              </ul>
            </div>
          </div>
          <div className="col-sm-4">
            <div className={css.hoer}>
              <Badge variant="info">
                <h5>24 цагийн тасралтгүй хяналт, удирдлага</h5>
              </Badge>
              <ul>
                <br />
                <li>
                  Тоног төхөөрөмжүүдийг автомат горимд ажиллуулах, хяналт тавих
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-4">
            {" "}
            <div className={css.gurav}>
              <Badge variant="info">
                <h5>Ажиллагааны нарийвчилсан тайлан мэдээ</h5>
              </Badge>
              <ul>
                <br />
                <li>Тоолууруудын тайлан мэдээ</li>
                <li>Насосуудын ажилласан тайлан мэдээ</li>
                <li>Ажиллагаатай холбоотой тайлан мэдээ</li>
                <li>Алдаа анхааруулгын тайлан мэдээ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
