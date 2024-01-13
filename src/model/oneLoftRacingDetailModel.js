// HOW TO IMPORT ?
// const Convert = require('location/oneLoftRacingDetailModel.js'); 
// OR
// import Convert from 'location/oneLoftRacingDetailModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfoneLoftRacingDetailModel(data)
// FOR ARRAY
// const data = Convert.listOfoneLoftRacingDetailModel(data)
const modelOfDataoneLoftRacingDetailModel = {
	detail: modelOfDatadetail,
	data: [modelOfDatadata]
};
function listOfoneLoftRacingDetailModel(data = []) {
  var listData = [modelOfDataoneLoftRacingDetailModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				detail: objectOfdetail(val.detail ?? null),
				data: listOfdata(val.data ?? [])
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfoneLoftRacingDetailModel(data = null) {
  var objectData = modelOfDataoneLoftRacingDetailModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.detail = objectOfdetail(data.detail ?? null);
		objectData.data = listOfdata(data.data ?? []);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfoneLoftRacingDetailModel: listOfoneLoftRacingDetailModel,
  objectOfoneLoftRacingDetailModel: objectOfoneLoftRacingDetailModel,
};

const modelOfDatadetail = {
	name: '',
	type: '',
	race_no: '',
	race_name: '',
	date: '',
	liberation_time: '',
	cut_off: '',
	distance: ''
};
function objectOfdetail(data = null) {
  var objectData = modelOfDatadetail;
  if (data == null) {
    return null;
  }
  try {
		objectData.name = data.name ?? null;
		objectData.type = data.type ?? null;
		objectData.race_no = data.race_no ?? null;
		objectData.race_name = data.race_name ?? null;
		objectData.date = data.date ?? null;
		objectData.liberation_time = data.liberation_time ?? null;
		objectData.cut_off = data.cut_off ?? null;
		objectData.distance = data.distance ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
const modelOfDatadata = {
	rank: '',
	country: '',
	loft: '',
	ring: '',
	arrival: '',
	duration: '',
	speed: ''
};
function listOfdata(data = []) {
  var listData = [modelOfDatadata];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				rank: val.rank ?? null,
				country: val.country ?? null,
				loft: val.loft ?? null,
				ring: val.ring ?? null,
				arrival: val.arrival ?? null,
				duration: val.duration ?? null,
				speed: val.speed ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}



  