const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../Models/User");

const redisClient = new Redis();

// Controller function to register a new user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "User already exists",
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    await redisClient.publish("userRegistration", JSON.stringify(newUser));

    res.status(201).json({
      status: true,
      statusCode: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Controller function to log in a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, "social-media-microservices", {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
