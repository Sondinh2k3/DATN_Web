import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
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

// Tạo custom icon cho USV
const usvIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Dashboard = () => {
  const [position, setPosition] = useState([21.0285, 105.8542]);
  const [waterData, setWaterData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Mực nước (cm)',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
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
  const mapRef = useRef();

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
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
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
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>Tổng quan hệ thống</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
        {/* Bản đồ */}
        <div style={{ width: '50%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '15px', backgroundColor: 'white' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Vị trí USV</h3>
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: '400px', width: '100%', borderRadius: '8px' }}
            whenCreated={(map) => {
              mapRef.current = map;
              map.panTo(position);
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={usvIcon}>
              <Popup>
                <div>
                  <h4>Thông tin USV</h4>
                  <p>Kinh độ: {position[1].toFixed(6)}</p>
                  <p>Vĩ độ: {position[0].toFixed(6)}</p>
                  <p>Thời gian: {new Date().toLocaleTimeString()}</p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={position}
              radius={50}
              pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
            />
          </MapContainer>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '5px 0' }}>Kinh độ: {position[1].toFixed(6)}</p>
              <p style={{ margin: '5px 0' }}>Vĩ độ: {position[0].toFixed(6)}</p>
            </div>
            <button 
              onClick={() => mapRef.current?.setView(position, 15)}
              style={{
                padding: '8px 15px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Tập trung vào USV
            </button>
          </div>
        </div>

        {/* Đồ thị mực nước */}
        <div style={{ width: '50%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '15px', backgroundColor: 'white' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Mực nước</h3>
          <div style={{ position: 'relative', height: '400px', width: '100%' }}>
            <Line
              data={waterData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: { 
                      display: true, 
                      text: 'Mực nước (cm)',
                      font: { size: 14 }
                    },
                    grid: {
                      color: 'rgba(0,0,0,0.1)'
                    }
                  },
                  x: {
                    title: { 
                      display: true, 
                      text: 'Thời gian',
                      font: { size: 14 }
                    },
                    grid: {
                      color: 'rgba(0,0,0,0.1)'
                    }
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    labels: {
                      font: { size: 14 }
                    }
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  }
                },
                elements: {
                  point: {
                    radius: 4,
                    hoverRadius: 6
                  }
                }
              }}
            />
          </div>
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
              Mực nước hiện tại: {waterData.datasets[0].data.slice(-1)[0]?.toFixed(1) || 'N/A'} cm
            </p>
          </div>
        </div>
      </div>

      {/* Trạng thái hệ thống */}
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px', textAlign: 'center' }}>Trạng thái hệ thống</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Trạm Base</p>
            <span style={{ 
              color: status.base === 'OK' ? '#2ecc71' : '#e74c3c',
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: status.base === 'OK' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)'
            }}>
              {status.base}
            </span>
          </div>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Rover</p>
            <span style={{ 
              color: status.rover === 'RTK Fixed' ? '#2ecc71' : '#f39c12',
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: status.rover === 'RTK Fixed' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(243, 156, 18, 0.1)'
            }}>
              {status.rover}
            </span>
          </div>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Gateway</p>
            <span style={{ 
              color: status.gateway === 'Online' ? '#2ecc71' : '#e74c3c',
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: status.gateway === 'Online' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)'
            }}>
              {status.gateway}
            </span>
          </div>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Cập nhật cuối</p>
            <span style={{ 
              color: '#3498db',
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: 'rgba(52, 152, 219, 0.1)'
            }}>
              {status.lastUpdate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;