import bcrypt from 'bcryptjs';
import { store } from '../data/store.js';
import { generateToken } from '../middleware/auth.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = store.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = store.createUser({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      role: role === 'admin' ? 'admin' : 'customer',
      drivingLicense: {
        number: 'DL-' + Math.floor(10000000 + Math.random() * 90000000),
        verified: true,
        expiryDate: '2028-12-31',
      },
    });

    const token = generateToken(newUser);

    const { password: _, ...userWithoutPass } = newUser;

    return res.status(201).json({
      message: 'Registration successful',
      user: userWithoutPass,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = store.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPass } = user;

    return res.json({
      message: 'Login successful',
      user: userWithoutPass,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = store.findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password: _, ...userWithoutPass } = user;
    return res.json(userWithoutPass);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, drivingLicense } = req.body;
    const updated = store.updateUser(req.user._id, {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(drivingLicense && { drivingLicense }),
    });

    const { password: _, ...userWithoutPass } = updated;
    return res.json({
      message: 'Profile updated successfully',
      user: userWithoutPass,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

