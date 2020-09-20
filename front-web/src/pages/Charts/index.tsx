import React from 'react';
import './styles.css';
import Filters from '../../components/Filters';
import Chart from 'react-apexcharts';
import { barOptions, pieOptions } from './chart-options';
import axios from 'axios';
import {
  buildBarSeries,
  getPlatformChartData,
  getGenderChartData,
} from './helpers';

type PieChartData = {
  labels: string[];
  series: number[];
};

type BarChartData = {
  x: string;
  y: number;
};

const initialPieData = {
  labels: [],
  series: [],
};

const BASE_URL = 'http://localhost:8080';

export default function Charts() {
  const [barChartData, setBarChartData] = React.useState<BarChartData[]>([]);
  const [platformData, setPlatformData] = React.useState<PieChartData>(
    initialPieData
  );
  const [genderData, setGenderData] = React.useState<PieChartData>(
    initialPieData
  );

  React.useEffect(() => {
    const getData = async () => {
      const recordsResponse = await axios.get(`${BASE_URL}/records`);
      const gamesResponse = await axios.get(`${BASE_URL}/games`);

      const barData = buildBarSeries(
        gamesResponse.data,
        recordsResponse.data.content
      );
      setBarChartData(barData);

      const platformCharData = getPlatformChartData(
        recordsResponse.data.content
      );
      setPlatformData(platformCharData);

      const genderCharData = getGenderChartData(recordsResponse.data.content);
      setGenderData(genderCharData);
    };
    getData();
  }, []);

  return (
    <div className="page-container">
      <Filters link="/records" linkText="VER TABELA" />;
      <div className="chart-container">
        <div className="top-related">
          <h1 className="top-related-title">Jogos mais Votados</h1>
          <div className="games-container">
            <Chart
              options={barOptions}
              type="bar"
              width="730"
              height="650"
              series={[{ data: barChartData }]}
            />
          </div>
        </div>
        <div className="charts">
          <div className="platform-chart">
            <h2 className="chart-title">Plataforma</h2>
            <Chart
              options={{ ...pieOptions, labels: platformData?.labels }}
              type="donut"
              series={platformData?.series}
              width="350"
            />
          </div>
          <div className="gender-chart">
            <h2 className="chart-title">Gêneros</h2>
            <Chart
              options={{ ...pieOptions, labels: genderData?.labels }}
              type="donut"
              series={genderData?.series}
              width="350"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
