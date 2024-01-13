// HOW TO IMPORT ?
// const Convert = require('location/oneLoftRacingModel.js'); 
// OR
// import Convert from 'location/oneLoftRacingModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfoneLoftRacingModel(data)
// FOR ARRAY
// const data = Convert.listOfoneLoftRacingModel(data)
const modelOfDataoneLoftRacingModel = {
	club_image: '',
	name: '',
	flag_image: '',
	country: '',
	race_session: '',
	race_uri: '',
	race_number: '',
	loft: '',
	pigeons: '',
	type: ''
};
function listOfoneLoftRacingModel(data = []) {
  var listData = [modelOfDataoneLoftRacingModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				club_image: val.club_image ?? null,
				name: val.name ?? null,
				flag_image: val.flag_image ?? null,
				country: val.country ?? null,
				race_session: val.race_session ?? null,
				race_uri: val.race_uri ?? null,
				race_number: val.race_number ?? null,
				loft: val.loft ?? null,
				pigeons: val.pigeons ?? null,
				type: val.type ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfoneLoftRacingModel(data = null) {
  var objectData = modelOfDataoneLoftRacingModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.club_image = data.club_image ?? null;
		objectData.name = data.name ?? null;
		objectData.flag_image = data.flag_image ?? null;
		objectData.country = data.country ?? null;
		objectData.race_session = data.race_session ?? null;
		objectData.race_uri = data.race_uri ?? null;
		objectData.race_number = data.race_number ?? null;
		objectData.loft = data.loft ?? null;
		objectData.pigeons = data.pigeons ?? null;
		objectData.type = data.type ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfoneLoftRacingModel: listOfoneLoftRacingModel,
  objectOfoneLoftRacingModel: objectOfoneLoftRacingModel,
};




  