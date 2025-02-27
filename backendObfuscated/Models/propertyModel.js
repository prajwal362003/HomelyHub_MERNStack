// Deobfuscated
const mongoose = require("mongoose");
const slugify = require("slugify");

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, "Please enter your property name"],
  },
  description: {
    type: String,
    required: [true, "Please add information about your property."],
  },
  extraInfo: {
    type: String,
    default:
      "Nestled in a tranquil neighborhood, the house exudes an aura of charm and elegance. The exterior is adorned with a harmonious blend of classic and contemporary architectural elements, featuring a beautiful brick facade and a welcoming front porch. As you step inside, you are greeted by a spacious, sunlit living room with high ceilings and large windows that invite an abundance of natural light. The hardwood floors add a touch of warmth to the space, complementing the neutral color palette. The kitchen is a chef's dream, equipped with modern appliances, sleek countertops, and ample storage space. It opens up to a cozy dining area, creating a perfect setting for family meals and gatherings.",
  },
  propertyType: {
    type: String,
    enum: ["House", "Flat", "Guest House", "Hotel"],
    default: "House",
  },
  roomType: {
    type: String,
    enum: ["Anytype", "Room", "Entire Home"],
    default: "Anytype",
  },
  maximumGuest: {
    type: Number,
    required: [
      true,
      "Please give the maximum number of guests that can occupy",
    ],
  },
  amenities: [
    {
      name: {
        type: String,
        required: true,
        enum: [
          "Wifi",
          "Kitchen",
          "Ac",
          "Washing Machine",
          "Tv",
          "Pool",
          "Free Parking",
        ],
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  images: {
    type: [
      {
        publicId: {
          type: String,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    validate: {
      validator: function (imageArray) {
        return imageArray.length >= 5;
      },
      message: "The images array must contain at least 5 images.",
    },
  },
  price: {
    type: Number,
    required: [true, "Please enter the price per night value"],
    default: 500,
  },
  address: {
    area: String,
    city: String,
    state: String,
    pincode: Number,
  },
  currentBookings: [
    {
      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
      fromDate: Date,
      toDate: Date,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  slug: String,
  checkInTime: {
    type: String,
    default: "11:00",
  },
  checkOutTime: {
    type: String,
    default: "13:00",
  },
});

propertySchema.pre("save", function (next) {
  this.slug = slugify(this.propertyName, { lower: true });
  next();
});

propertySchema.pre("save", function (next) {
  this.address.city = this.address.city.toLowerCase().replaceAll(" ", "");
  next();
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
// Obfuscated

// const _0x3f804b = _0x28dc;
// (function (_0x14a130, _0xaa722b) {
//   const _0x279fe8 = _0x28dc,
//     _0x3c5ff3 = _0x14a130();
//   while (!![]) {
//     try {
//       const _0x206f85 =
//         -parseInt(_0x279fe8(0x16d)) / 0x1 +
//         -parseInt(_0x279fe8(0x166)) / 0x2 +
//         -parseInt(_0x279fe8(0x179)) / 0x3 +
//         -parseInt(_0x279fe8(0x160)) / 0x4 +
//         parseInt(_0x279fe8(0x17d)) / 0x5 +
//         parseInt(_0x279fe8(0x169)) / 0x6 +
//         parseInt(_0x279fe8(0x164)) / 0x7;
//       if (_0x206f85 === _0xaa722b) break;
//       else _0x3c5ff3["push"](_0x3c5ff3["shift"]());
//     } catch (_0x4c6d6b) {
//       _0x3c5ff3["push"](_0x3c5ff3["shift"]());
//     }
//   }
// })(_0x7bc0, 0x5516e);
// const mongoose = require(_0x3f804b(0x16a)),
//   slugify = require("slugify"),
//   propertySchema = new mongoose[_0x3f804b(0x175)]({
//     propertyName: { type: String, required: [!![], _0x3f804b(0x167)] },
//     description: {
//       type: String,
//       required: [
//         !![],
//         "Please\x20add\x20information\x20about\x20your\x20property.",
//       ],
//     },
//     extraInfo: {
//       type: String,
//       default:
//         "Nestled\x20in\x20a\x20tranquil\x20neighborhood,\x20the\x20house\x20exudes\x20an\x20aura\x20of\x20charm\x20and\x20elegance.\x20The\x20exterior\x20is\x20adorned\x20with\x20a\x20harmonious\x20blend\x20of\x20classic\x20and\x20contemporary\x20architectural\x20elements,\x20featuring\x20a\x20beautiful\x20brick\x20facade\x20and\x20a\x20welcoming\x20front\x20porch.As\x20you\x20step\x20inside,\x20you\x20are\x20greeted\x20by\x20a\x20spacious,\x20sunlit\x20living\x20room\x20with\x20high\x20ceilings\x20and\x20large\x20windows\x20that\x20invite\x20an\x20abundance\x20of\x20natural\x20light.\x20The\x20hardwood\x20floors\x20add\x20a\x20touch\x20of\x20warmth\x20to\x20the\x20space,\x20complementing\x20the\x20neutral\x20color\x20palette.The\x20kitchen\x20is\x20a\x20chef\x27s\x20dream,\x20equipped\x20with\x20modern\x20appliances,\x20sleek\x20countertops,\x20and\x20ample\x20storage\x20space.\x20It\x20opens\x20up\x20to\x20a\x20cozy\x20dining\x20area,\x20creating\x20a\x20perfect\x20setting\x20for\x20family\x20meals\x20and\x20gatherings.",
//     },
//     propertyType: {
//       type: String,
//       enum: [_0x3f804b(0x16e), _0x3f804b(0x17a), "Guest\x20House", "Hotel"],
//       default: _0x3f804b(0x16e),
//     },
//     roomType: {
//       type: String,
//       enum: ["Anytype", "Room", "Entire\x20Home"],
//       default: _0x3f804b(0x168),
//     },
//     maximumGuest: { type: Number, required: [!![], _0x3f804b(0x178)] },
//     amenities: [
//       {
//         name: {
//           type: String,
//           required: !![],
//           enum: [
//             _0x3f804b(0x15f),
//             "Kitchen",
//             "Ac",
//             _0x3f804b(0x172),
//             "Tv",
//             _0x3f804b(0x170),
//             _0x3f804b(0x162),
//           ],
//         },
//         icon: { type: String, required: !![] },
//       },
//     ],
//     images: {
//       type: [
//         { public_id: { type: String }, url: { type: String, required: !![] } },
//       ],
//       validate: {
//         validator: function (_0x4553dc) {
//           const _0x52b25c = _0x3f804b;
//           return _0x4553dc[_0x52b25c(0x176)] >= 0x5;
//         },
//         message: _0x3f804b(0x16c),
//       },
//     },
//     price: {
//       type: Number,
//       required: [
//         !![],
//         "Please\x20enter\x20the\x20Price\x20per\x20night\x20value",
//       ],
//       default: 0x1f4,
//     },
//     address: { area: String, city: String, state: String, pincode: Number },
//     currentBookings: [
//       {
//         bookingId: {
//           type: mongoose[_0x3f804b(0x175)]["Types"][_0x3f804b(0x17b)],
//           ref: _0x3f804b(0x161),
//         },
//         fromDate: Date,
//         toDate: Date,
//         userId: {
//           type: mongoose[_0x3f804b(0x175)][_0x3f804b(0x174)]["ObjectId"],
//           ref: _0x3f804b(0x177),
//         },
//       },
//     ],
//     userId: {
//       type: mongoose[_0x3f804b(0x175)][_0x3f804b(0x174)][_0x3f804b(0x17b)],
//       ref: _0x3f804b(0x177),
//     },
//     slug: String,
//     checkInTime: { type: String, default: "11:00" },
//     checkOutTime: { type: String, default: _0x3f804b(0x17e) },
//   });
// propertySchema[_0x3f804b(0x17c)]("save", function (_0x1bcd07) {
//   const _0x5495c2 = _0x3f804b;
//   (this[_0x5495c2(0x163)] = slugify(this["propertyName"], { lower: !![] })),
//     _0x1bcd07();
// }),
//   propertySchema["pre"](_0x3f804b(0x17f), function (_0x4cc74d) {
//     const _0x1d7aac = _0x3f804b;
//     (this[_0x1d7aac(0x165)][_0x1d7aac(0x16f)] = this[_0x1d7aac(0x165)][
//       _0x1d7aac(0x16f)
//     ]
//       [_0x1d7aac(0x16b)]()
//       [_0x1d7aac(0x173)]("\x20", "")),
//       _0x4cc74d();
//   });
// const Property = mongoose[_0x3f804b(0x171)](_0x3f804b(0x15e), propertySchema);
// function _0x28dc(_0x1c3d96, _0x1afded) {
//   const _0x7bc0dc = _0x7bc0();
//   return (
//     (_0x28dc = function (_0x28dce9, _0x1f4694) {
//       _0x28dce9 = _0x28dce9 - 0x15e;
//       let _0x4a0a9e = _0x7bc0dc[_0x28dce9];
//       return _0x4a0a9e;
//     }),
//     _0x28dc(_0x1c3d96, _0x1afded)
//   );
// }
// function _0x7bc0() {
//   const _0x3247a0 = [
//     "The\x20images\x20array\x20must\x20contain\x20at\x20least\x205\x20images.",
//     "642429jCKDaX",
//     "House",
//     "city",
//     "Pool",
//     "model",
//     "Washing\x20Machine",
//     "replaceAll",
//     "Types",
//     "Schema",
//     "length",
//     "User",
//     "Please\x20give\x20the\x20maximum\x20no\x20of\x20Guest\x20that\x20can\x20occupy",
//     "435999aVLkZD",
//     "Flat",
//     "ObjectId",
//     "pre",
//     "1450275yrRevO",
//     "13:00",
//     "save",
//     "Property",
//     "Wifi",
//     "1942240CsNFEz",
//     "Booking",
//     "Free\x20Parking",
//     "slug",
//     "10104024LVtCNQ",
//     "address",
//     "1016600DLdDzs",
//     "Please\x20enter\x20your\x20property\x20name",
//     "Anytype",
//     "2379966MvHPTq",
//     "mongoose",
//     "toLowerCase",
//   ];
//   _0x7bc0 = function () {
//     return _0x3247a0;
//   };
//   return _0x7bc0();
// }
// module["exports"] = Property;
