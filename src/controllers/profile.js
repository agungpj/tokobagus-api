const { profile, user } = require("../../models");

exports.getProfile = async (req, res) => {
  try {
    const idUser = req.user.id;

    let data = await profile.findOne({
      where: {
        idUser,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: data.image ? process.env.PATH_FILE + data.image : null,
    };

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addProfile = async (req, res) => {
  try {
    let { productId } = req.body;
    productId = productId.split(",");

    const data = {
      phone: req.body.name,
      gender: req.body.desc,
      address: req.body.price,
      image: req.file.filename,
      idUser: req.user.id,
    };

    let newProfile = await profile.create(data);

    const profileData = productId.map((item) => {
      return { idUser: newProfile };
    });

    await productProfile.bulkCreate(profileData);

    let productData = await profile.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    productData = JSON.parse(JSON.stringify(productData));

    res.send({
      status: "success...",
      data: {
        ...productData,
        image: process.env.PATH_FILE + productData.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
