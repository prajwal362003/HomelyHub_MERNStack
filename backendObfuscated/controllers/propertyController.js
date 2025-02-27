// Deobfuscated Code

const Property = require("../Models/propertyModel");
const APIFeatures = require("../utils/APIFeatures");

// Fetches a single property based on its ID
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Creates a new property
exports.createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      userId: req.user.id,
    };
    const newProperty = await Property.create(propertyData);
    res.status(200).json({
      status: "success",
      data: {
        data: newProperty,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Fetches all properties with optional filtering, searching, and pagination
exports.getProperties = async (req, res) => {
  try {
    const apiFeatures = new APIFeatures(Property.find(), req.query)
      .filter()
      .search()
      .paginate();
    const allProperties = await Property.find();
    const filteredProperties = await apiFeatures.query;
    res.status(200).json({
      status: "success",
      no_of_responses: filteredProperties.length,
      all_Properties: allProperties.length,
      data: filteredProperties,
    });
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Fetches all properties created by the logged-in user.
exports.getUsersProperties = async (req, res) => {
  try {
    const userId = req.user._id;
    const userProperties = await Property.find({
      userId: userId,
    });
    res.status(200).json({
      status: "success",
      data_length: userProperties.length,
      data: userProperties,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Obfuscated Code

// const _0x46e601 = _0x4f0d;
// function _0x4f0d(_0x3e3912, _0x647fd2) {
//   const _0x283c57 = _0x283c();
//   return (
//     (_0x4f0d = function (_0x4f0d84, _0x24d9ff) {
//       _0x4f0d84 = _0x4f0d84 - 0x1b4;
//       let _0x3da055 = _0x283c57[_0x4f0d84];
//       return _0x3da055;
//     }),
//     _0x4f0d(_0x3e3912, _0x647fd2)
//   );
// }
// function _0x283c() {
//   const _0x30d083 = [
//     "length",
//     "3592NbTFKr",
//     "../Models/propertyModel",
//     "682210AvKHeh",
//     "paginate",
//     "Internal\x20server\x20error",
//     "fail",
//     "97516woQepV",
//     "message",
//     "12807SOdpxX",
//     "231eOALvG",
//     "query",
//     "find",
//     "json",
//     "body",
//     "search",
//     "628689KGJAZL",
//     "../utils/APIFeatures",
//     "success",
//     "49614nyZxRT",
//     "14IzoYkV",
//     "status",
//     "477490nSAoit",
//     "create",
//     "_id",
//     "error",
//     "filter",
//     "getUsersProperties",
//     "params",
//     "getProperties",
//     "240177RLAjzk",
//     "user",
//   ];
//   _0x283c = function () {
//     return _0x30d083;
//   };
//   return _0x283c();
// }
// (function (_0x391691, _0x4d59f7) {
//   const _0x29aba5 = _0x4f0d,
//     _0x9448e6 = _0x391691();
//   while (!![]) {
//     try {
//       const _0x10c219 =
//         parseInt(_0x29aba5(0x1cc)) / 0x1 +
//         (-parseInt(_0x29aba5(0x1d0)) / 0x2) *
//           (parseInt(_0x29aba5(0x1ba)) / 0x3) +
//         -parseInt(_0x29aba5(0x1c3)) / 0x4 +
//         -parseInt(_0x29aba5(0x1bf)) / 0x5 +
//         (parseInt(_0x29aba5(0x1cf)) / 0x6) *
//           (-parseInt(_0x29aba5(0x1c6)) / 0x7) +
//         (-parseInt(_0x29aba5(0x1bd)) / 0x8) *
//           (-parseInt(_0x29aba5(0x1c5)) / 0x9) +
//         parseInt(_0x29aba5(0x1d2)) / 0xa;
//       if (_0x10c219 === _0x4d59f7) break;
//       else _0x9448e6["push"](_0x9448e6["shift"]());
//     } catch (_0x586ac3) {
//       _0x9448e6["push"](_0x9448e6["shift"]());
//     }
//   }
// })(_0x283c, 0x4e6e6);
// const Property = require(_0x46e601(0x1be)),
//   APIFeatures = require(_0x46e601(0x1cd));
// (exports["getProperty"] = async (_0x3c3d9d, _0x75807c) => {
//   const _0x207d7b = _0x46e601;
//   try {
//     const _0x632d0a = await Property["findById"](
//       _0x3c3d9d[_0x207d7b(0x1b8)]["id"]
//     );
//     _0x75807c[_0x207d7b(0x1d1)](0xc8)[_0x207d7b(0x1c9)]({
//       status: _0x207d7b(0x1ce),
//       data: _0x632d0a,
//     });
//   } catch (_0x5f5751) {
//     _0x75807c[_0x207d7b(0x1d1)](0x194)["json"]({
//       status: _0x207d7b(0x1c2),
//       message: _0x5f5751[_0x207d7b(0x1c4)],
//     });
//   }
// }),
//   (exports["createProperty"] = async (_0x11ec1f, _0x3f7833) => {
//     const _0x5f5108 = _0x46e601;
//     try {
//       const _0x36189d = {
//           ..._0x11ec1f[_0x5f5108(0x1ca)],
//           userId: _0x11ec1f["user"]["id"],
//         },
//         _0x5ea234 = await Property[_0x5f5108(0x1d3)](_0x36189d);
//       _0x3f7833[_0x5f5108(0x1d1)](0xc8)[_0x5f5108(0x1c9)]({
//         status: _0x5f5108(0x1ce),
//         data: { data: _0x5ea234 },
//       });
//     } catch (_0x33d538) {
//       _0x3f7833[_0x5f5108(0x1d1)](0x194)[_0x5f5108(0x1c9)]({
//         status: _0x5f5108(0x1c2),
//         message: _0x33d538[_0x5f5108(0x1c4)],
//       });
//     }
//   }),
//   (exports[_0x46e601(0x1b9)] = async (_0x209777, _0x531163) => {
//     const _0x5c44c8 = _0x46e601;
//     try {
//       const _0x55a867 = new APIFeatures(
//           Property[_0x5c44c8(0x1c8)](),
//           _0x209777[_0x5c44c8(0x1c7)]
//         )
//           [_0x5c44c8(0x1b6)]()
//           [_0x5c44c8(0x1cb)]()
//           [_0x5c44c8(0x1c0)](),
//         _0x50b4df = await Property[_0x5c44c8(0x1c8)](),
//         _0x11af0e = await _0x55a867["query"];
//       _0x531163[_0x5c44c8(0x1d1)](0xc8)["json"]({
//         status: "success",
//         no_of_responses: _0x11af0e[_0x5c44c8(0x1bc)],
//         all_Properties: _0x50b4df[_0x5c44c8(0x1bc)],
//         data: _0x11af0e,
//       });
//     } catch (_0x52af44) {
//       console[_0x5c44c8(0x1b5)]("Error\x20searching\x20properties:", _0x52af44),
//         _0x531163[_0x5c44c8(0x1d1)](0x1f4)[_0x5c44c8(0x1c9)]({
//           error: _0x5c44c8(0x1c1),
//         });
//     }
//   }),
//   (exports[_0x46e601(0x1b7)] = async (_0x5b2f45, _0x35e73c) => {
//     const _0x449808 = _0x46e601;
//     try {
//       const _0x206fd2 = _0x5b2f45[_0x449808(0x1bb)][_0x449808(0x1b4)],
//         _0x186ca6 = await Property[_0x449808(0x1c8)]({ userId: _0x206fd2 });
//       _0x35e73c[_0x449808(0x1d1)](0xc8)[_0x449808(0x1c9)]({
//         status: _0x449808(0x1ce),
//         data_length: _0x186ca6[_0x449808(0x1bc)],
//         data: _0x186ca6,
//       });
//     } catch (_0x474f06) {
//       _0x35e73c["status"](0x194)[_0x449808(0x1c9)]({
//         status: "fail",
//         message: _0x474f06[_0x449808(0x1c4)],
//       });
//     }
//   });
