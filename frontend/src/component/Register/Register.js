import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { apiRegister } from '../../services/auth';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // State cho form đăng ký
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Xử lý đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (registerData.password !== registerData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            setLoading(false);
            return;
        }

        try {
            await axios.post('/api/auth/register', {
                username: registerData.username,
                email: registerData.email,
                password: registerData.password
            });
            // Sau khi đăng ký thành công, chuyển về trang đăng nhập
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    };

    // Xử lý thay đổi input
    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Đăng Ký</h2>
            
            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleRegister} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="username" style={styles.label}>Tên người dùng</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={registerData.username}
                        onChange={handleRegisterChange}
                        placeholder="Nhập tên người dùng"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        placeholder="Nhập email"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        placeholder="Nhập mật khẩu"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="confirmPassword" style={styles.label}>Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        placeholder="Nhập lại mật khẩu"
                        style={styles.input}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                </button>
            </form>

            <p style={styles.footerText}>
                Đã có tài khoản?{' '}
                <Link 
                    to="/login" 
                    style={styles.switchButton}
                >
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        textAlign: 'left',
    },
    label: {
        fontSize: '14px',
        marginBottom: '5px',
        color: '#555',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    switchButton: {
        color: '#007bff',
        textDecoration: 'none',
        cursor: 'pointer',
        fontSize: '14px',
    },
    footerText: {
        marginTop: '15px',
        fontSize: '14px',
        color: '#666',
    },
    error: {
        color: '#dc3545',
        backgroundColor: '#f8d7da',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '15px',
        fontSize: '14px',
    },
};

export default Register; 