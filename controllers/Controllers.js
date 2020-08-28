const yup = require("yup");
const { nanoid } = require("nanoid");
const express = require("express");
const app = express();

/* --------------------------- import db variable -------------------------- */

const db = require("../db");
const urls = db.get("urls");
// urls.createIndex({ CustomId: 1 }, { unique: true });

/* ---------------------------- declaring schemas --------------------------- */

const schema = yup.object().shape({
  CustomId: yup
    .string()
    .trim()
    .matches(/^[\w\-]+$/i),
  url: yup.string().trim().url().required(),
});

/* ------------------------------- get request ------------------------------ */

exports.Get_url = async (req, res, next) => {
  //TODO:
  const { id: CustomId } = req.params;
  try {
    const url = await urls.findOne({ CustomId });
    if (url) {
      return res.redirect(url.url);
    }
  } catch (error) {
    next(error);
  }
};

/* ------------------------ post req and validations ------------------------ */

exports.Post_url = async (req, res, next) => {
  //TODO:

  let { CustomId, url } = req.body;

  try {
    await schema.validate({
      CustomId,
      url,
    });
    //if customer enter a custom id
    if (!CustomId) {
      CustomId = nanoid(6);
    } else {
      const existing = await urls.findOne({ CustomId });
      if (existing) {
        return res.status(403).json({
          error: "ID IS ALREADY USED !! TRY A  NEW ONE 😁",
        });
      }
    }
    CustomId = CustomId.toLowerCase();
    const newUrl = {
      url,
      CustomId,
    };
    const created = await urls.insert(newUrl);
    res.json(created);
  } catch (error) {
    next(error);
  }
};

// app.use((error, req, res, next) => {
//   if (error.status) {
//     res.status(error.status);
//   } else {
//     res.status(500);
//   }
//   res.json({
//     message: error.message,
//     stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
//   });
// });
