import React from 'react';
import axios from 'axios';
import './styles.css';
import { RecordsResponse } from './types';
import { formatDate } from './Helpers';
import Pagination from './Pagination';
import Filters from '../../components/Filters';

const BASE_URL = 'http://localhost:8080';

export default function Records() {
  const [recordsResponse, SetRecordsResponse] = React.useState<
    RecordsResponse
  >();

  const [activePage, SetActivePage] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
      .then((response) => SetRecordsResponse(response.data));
  }, [activePage]);

  const handlePageChange = (index: number) => {
    SetActivePage(index);
  };

  return (
    <div className="page-container">
      <Filters link="/charts" linkText="VER GRÁFICO" />
      <table className="records-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>INSTANT</th>
            <th>NOME</th>
            <th>IDADE</th>
            <th>PLATAFORMA</th>
            <th>GÊNERO</th>
            <th>TÍTULO DO GAME</th>
          </tr>
        </thead>
        <tbody>
          {recordsResponse?.content.map(
            ({ id, moment, name, age, gameTitle, gamePlatform, genreName }) => {
              return (
                <tr key={id}>
                  <td>{formatDate(moment)}</td>
                  <td>{name}</td>
                  <td>{age}</td>
                  <td className="text-secondary">{gamePlatform}</td>
                  <td>{genreName}</td>
                  <td className="text-primary">{gameTitle}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <Pagination
        totalPages={recordsResponse?.totalPages}
        goToPage={handlePageChange}
        activePage={activePage}
      />
    </div>
  );
}
