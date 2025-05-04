import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { apiLogin } from '../../services/auth';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // State cho form đăng nhập
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Xử lý đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await apiLogin(loginData);
            if (response.err === 0) {
                // Lấy vị trí cần chuyển hướng từ state hoặc mặc định là dashboard
                const from = location.state?.from?.pathname || '/dashboard';
                navigate(from, { replace: true });
            } else {
                setError(response.message || 'Đăng nhập thất bại');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    // Xử lý thay đổi input
    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Đăng Nhập</h2>
            
            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
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
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="Nhập mật khẩu"
                        style={styles.input}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                </button>
            </form>

            <p style={styles.footerText}>
                Chưa có tài khoản?{' '}
                <Link 
                    to="/register" 
                    style={styles.switchButton}
                >
                    Đăng ký
                </Link>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.9rem',
        color: '#666',
    },
    input: {
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
    },
    button: {
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '1rem',
    },
    error: {
        color: '#dc3545',
        marginBottom: '1rem',
        textAlign: 'center',
    },
    footerText: {
        textAlign: 'center',
        marginTop: '1rem',
        color: '#666',
    },
    switchButton: {
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default Login;