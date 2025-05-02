import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Line } from 'react-chartjs-2';
import 'leaflet/dist/leaflet.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import L from 'leaflet';

// Đăng ký thành phần cho Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Fix lỗi icon marker của Leaflet trong React 18

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Dashboard = () => {
  const [position, setPosition] = useState([21.0285, 105.8542]);
  const [waterData, setWaterData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Mực nước (cm)',
        data: [],
        borderColor: 'blue',
        fill: false,
      },
    ],
  });
  const [status, setStatus] = useState({
    base: 'OK',
    rover: 'RTK Fixed',
    gateway: 'Online',
    lastUpdate: 'Chưa cập nhật',
  });

  useEffect(() => {
    const mockData = () => {
      const now = new Date();
      const mock = Array.from({ length: 10 }, (_, i) => ({
        time: new Date(now - i * 5000).toLocaleTimeString(),
        lat: 21.0285 + Math.random() * 0.001,
        lon: 105.8542 + Math.random() * 0.001,
        water: 50 + Math.random() * 10,
      }));
      const latest = mock[0];
      setPosition([latest.lat, latest.lon]);
      setWaterData({
        labels: mock.map((d) => d.time).reverse(),
        datasets: [
          {
            label: 'Mực nước (cm)',
            data: mock.map((d) => d.water).reverse(),
            borderColor: 'blue',
            fill: false,
          },
        ],
      });
      setStatus({
        base: 'OK',
        rover: 'RTK Fixed',
        gateway: 'Online',
        lastUpdate: now.toLocaleTimeString(),
      });
    };

    mockData();
    const interval = setInterval(mockData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Tổng quan hệ thống</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {/* Bản đồ nhỏ */}
        <div style={{ width: '50%' }}>
          <h3>Vị trí USV</h3>
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: '300px', width: '100%' }}
            whenCreated={(map) => map.panTo(position)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <Marker position={position} />
          </MapContainer>
          <p>Kinh độ: {position[1].toFixed(6)}</p>
          <p>Vĩ độ: {position[0].toFixed(6)}</p>
        </div>

        {/* Đồ thị mực nước */}
        <div style={{ width: '50%', maxHeight: '300px' }}>
          <h3>Mực nước</h3>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <Line
              data={waterData}
              options={{
                responsive: true,
                maintainAspectRatio: false, // Cho phép đồ thị điều chỉnh theo container
                scales: {
                  y: { beginAtZero: true, max: 100, title: { display: true, text: 'cm' } },
                  x: { title: { display: true, text: 'Thời gian' } },
                },
                plugins: { legend: { display: true } },
              }}
            />
          </div>
          <p>Mực nước hiện tại: {waterData.datasets[0].data.slice(-1)[0]?.toFixed(1) || 'N/A'} cm</p>
        </div>
      </div>

      {/* Trạng thái hệ thống */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>Trạng thái</h3>
        <p>Trạm Base: <span style={{ color: status.base === 'OK' ? 'green' : 'red' }}>{status.base}</span></p>
        <p>Rover: <span style={{ color: status.rover === 'RTK Fixed' ? 'green' : 'orange' }}>{status.rover}</span></p>
        <p>Gateway: <span style={{ color: status.gateway === 'Online' ? 'green' : 'red' }}>{status.gateway}</span></p>
        <p>Cập nhật cuối: {status.lastUpdate}</p>
      </div>
    </div>
  );
};

export default Dashboard;