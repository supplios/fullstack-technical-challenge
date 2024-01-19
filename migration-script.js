const axios = require('axios');
const Papa = require('papaparse');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const apiEndpoint = 'http://localhost:3001/api/cars'; // Replace with your actual API endpoint

// Function to read CSV file and parse it
async function readCSV(filePath) {
  const fileData = await readFile(filePath, 'utf8');
  return new Promise((resolve, reject) => {
    Papa.parse(fileData, {
      header: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
}

// Function to post data to the API
async function postDataToAPI(data) {

  const reqData = {
    price: Number(data.price),
    brand:data?.brand && data?.brand?.trim(),
    model:data?.model && data?.model?.trim(),
    year:Number(data.year),
    title_status:data?.title_status && data?.title_status.trim(),
    mileage:parseInt(data?.mileage, 10),
    color: data?.color && data?.color?.trim(),
    vin:data?.vin && data?.vin?.trim(),
    lot: Number(data.lot),
    state:data.state && data?.state?.trim(),
    country: data.country && data?.country?.trim(),
    condition: data.condition && data?.condition?.trim(),
  }


  try {
    const response = await axios.post(apiEndpoint, reqData);
    console.log('Done: ' + response.data.id);

  } catch (error) {
    console.log("--------------------------------")
    console.error('Try to add this:', reqData);
    console.error('Error sending data:', error.response?.data || error.message);
    console.log("--------------------------------")
  }
}

// Main function to handle the migration
async function migrateData(filePath) {
  try {
    const data = await readCSV(filePath);
    for (const item of data) {
      await postDataToAPI(item);
    }
    console.log('All data migrated successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Replace 'path/to/your/file.csv' with the path to your CSV file
migrateData('./cars_datasets.csv');
