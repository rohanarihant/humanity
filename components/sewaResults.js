import React from 'react';
import NavBar from './NavBarBack';

const SewaResults = () => (
    <div className="result-container">
         <NavBar />
        <h2>Result 22-09-2020</h2>
        <table>
            <tr>
                <th colspan="3" className="states-heading">Top 5 States</th>
            </tr>
            <tr>
                <th>State</th>
                <th>Total Points</th>
                <th>Members</th>
            </tr>
            <tr>
                <td>Peter</td>
                <td>Griffin</td>
                <td>$100</td>
            </tr>
            <tr>
                <td>Lois</td>
                <td>Griffin</td>
                <td>$150</td>
            </tr>
            <tr>
                <td>Joe</td>
                <td>Swanson</td>
                <td>$300</td>
            </tr>
            <tr>
                <td>Cleveland</td>
                <td>Brown</td>
                <td>$250</td>
            </tr>
            <tr>
                <td>Cleveland</td>
                <td>Brown</td>
                <td>$250</td>
            </tr>
        </table>
        <hr />
    <style jsx>
        {`
        .result-container{
            margin-top: 70px;
        }
        .states-heading{
            text-align: center;
            font-size: 18px;
            font-weight: 700;
        }
        table {
            border-collapse: collapse;
            width: 100%;
          }
          
          th, td {
            text-align: left;
            padding: 8px;
          }
          
          tr:nth-child(even){background-color: #f2f2f2}
          
          th {
            background-color: #4CAF50;
            color: white;
          }
        `}
    </style>
    </div>
)

export default SewaResults;