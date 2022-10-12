require("dotenv").config();
const request = require("request");
const db = require("../models/index");
const { QueryTypes } = require("sequelize");
const moment = require("moment");
moment.locale("th");

exports.index = async (req, res) => {
  const { LINE_TOKEN } = process.env;
  const date = moment().format("YYYY-MM-DD");
  const dateTime = moment().format("Do MMMM YYYY HH:mm:ss");
  console.log("date:", date);
  console.log(dateTime);
  try {
    const [{ visit, authed, no_auth }] = await db.sequelize.query(
      `SELECT 
      COUNT(o.vn) AS visit,
      COUNT(vp.auth_code) AS authed ,
      COUNT(o.vn)- COUNT(vp.auth_code) AS no_auth
      FROM ovst o
      INNER JOIN visit_pttype vp ON o.vn=vp.vn
      WHERE o.vstdate = $1 `,
      {
        bind: [date],
        type: QueryTypes.SELECT,
      }
    );
    console.log(visit, authed, no_auth);
    const url_line_notification = "https://notify-api.line.me/api/notify";
    await request(
      {
        method: "POST",
        uri: url_line_notification,
        header: {
          "Content-Type": "multipart/form-data",
        },
        auth: {
          bearer: LINE_TOKEN,
        },
        form: {
          message: `วันที่ ${dateTime}
Visit ทั้งหมด: ${visit} ราย
Visit ที่มี authen code: ${authed} ราย
Visit ที่ยังไม่มี authen code: ${no_auth} ราย
            `,
        },
      },
      (err, httpResponse, body) => {
        if (err) {
          console.log(err);
          res.status(200).json({ message: err });
        } else {
          res.status(200).json(JSON.parse(body));
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
