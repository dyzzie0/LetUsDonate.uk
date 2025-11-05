import React, { useState } from 'react';
import '../../../css/data_reports.css';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

export function Data_Reports() {
  const generateReportDonations = () => {
    const donationData = [{ Period: '1D', Donations: 1 }];

    const csv = Papa.unparse(donationData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'donation_report.csv');
  };

  const generateReportUsers = () => {
    const userData = [{ Period: '1D', New_Users: 2 }];

    const csv = Papa.unparse(userData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'users_report.csv');
  };

  const generateReportSustainability = () => {
    const sustainabilityData = [{ Period: '1D', CO2_Reduced_kg: 0.5 }];

    const csv = Papa.unparse(sustainabilityData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'sustainability_report.csv');
  };

  const generateReportCharities = () => {
    const charityData = [{ Charity: 'Charity A', Donations_Received: 50 }];

    const csv = Papa.unparse(charityData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'charity_report.csv');
  };

  const generateAllReports = () => {
    generateReportDonations();
    generateReportUsers();
    generateReportSustainability();
    generateReportCharities();
  };

  return (
    <div className="main">
      <h2> Generate Reports</h2>
      <div className="return-link">
        <li>
          <Link to="/admin_dashboard"> Return</Link>
        </li>
      </div>

      <div className="report-info">
        <div className="report-download">
          <div className="report-buttons">
            <ii class="fa-solid fa-file-arrow-down"></ii>
            <p>Download Donation Report:</p>
            <button
              onClick={generateReportDonations}
              className="generate-report-btn" >
            </button>
          </div>

          <div className="report-buttons">
            <ii class="fa-solid fa-file-arrow-down"></ii>
            <p>Download User Report:</p>
            <button
              onClick={generateReportUsers}
              className="generate-report-btn"
            ></button>
          </div>
        </div>
        <div className="report-download">
          <div className="report-buttons">
            <ii class="fa-solid fa-file-arrow-down"></ii>
            <p>Download Sustainability Report:</p>
            <button
              onClick={generateReportSustainability}
              className="generate-report-btn"
            ></button>
          </div>

          <div className="report-buttons">
            <ii class="fa-solid fa-file-arrow-down"></ii>
            <p>Download Charity Report:</p>
            <button
              onClick={generateReportCharities}
              className="generate-report-btn"
            ></button>
          </div>
        </div>

        <div className="report-download">
          <div className="report-buttons">
            <ii class="fa-solid fa-file-arrow-down"></ii>
            <p>Download All Reports:</p>
            <button
              onClick={generateAllReports}
              className="generate-report-btn"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data_Reports;
