import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>USV Web</h1>
                <p className="subtitle">Hệ thống theo dõi và giám sát USV</p>
                <div className="cta-buttons">
                    <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
                    <Link to="/register" className="btn btn-secondary">Đăng ký</Link>
                </div>
            </div>

            <div className="features-section">
                <h2>Tính năng nổi bật</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📍</div>
                        <h3>Theo dõi vị trí</h3>
                        <p>Giám sát vị trí USV theo thời gian thực trên bản đồ</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Biểu đồ tốc độ</h3>
                        <p>Phân tích tốc độ di chuyển của USV qua biểu đồ trực quan</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🌊</div>
                        <h3>Mực nước</h3>
                        <p>Theo dõi và phân tích mực nước tại các vị trí khác nhau</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚙️</div>
                        <h3>Trạng thái hệ thống</h3>
                        <p>Kiểm tra trạng thái hoạt động của USV và các thiết bị</p>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h2>Về chúng tôi</h2>
                <p>
                    USV Web là hệ thống giám sát và theo dõi USV (Unmanned Surface Vehicle) 
                    với các tính năng hiện đại và giao diện thân thiện với người dùng. 
                    Đăng nhập để trải nghiệm đầy đủ các tính năng của hệ thống.
                </p>
            </div>
        </div>
    );
};

export default Home; 