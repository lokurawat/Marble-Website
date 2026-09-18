const userModel = require("../model/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log("incoming data",req.body)

    try {
        // 1. Check if user already exists (Moved INSIDE try-catch)
        const existedUser = await userModel.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash the password (FIXED: Removed the extra 'hash' argument)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create user in database
        let user = await userModel.create({
            name, 
            email, 
            password: hashedPassword,
            role: role || "user" // Good practice to assign a default role
        });

        if (user) {
            // 4. Send Verification OTP email
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `Welcome to shopNest Mr ${name}!\nYour OTP for shopNest is ${otp}`;
            
            // Optional: wrap in its own try/catch if you don't want email failures to block registration
            await sendEmail(email, `Welcome to the shopNest your otp for registration is `, message);

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            return res.status(400).json({ message: "Invalid user data received" });
        }
    } catch (error) {
        console.error("Register Error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

// @desc    Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        let user = await userModel.findOne({ email });

        if (user) {
            // FIXED: Added 'await' to ensure the password comparison completes accurately
            let result = await bcrypt.compare(password, user.password);
            
            if (result) {
                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id)
                });
            } else {
                return res.status(400).json({ message: "Invalid email or password" });
            }
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get all users (Admin Protected)
const getUsers = async (req, res) => {
    try {
        let users = await userModel.find({}).select('-password');
        return res.json(users);
    } catch (error) {
        console.error("GetUsers Error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    registerUser,
    getUsers,
    loginUser
};
