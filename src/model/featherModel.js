// HOW TO IMPORT ?
// const Convert = require('location/featherModel.js'); 
// OR
// import Convert from 'location/featherModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOffeatherModel(data)
// FOR ARRAY
// const data = Convert.listOffeatherModel(data)
const modelOfDatafeatherModel = {
	id: '',
	name: '',
	is_all: false,
	user_id: ''
};
function listOffeatherModel(data = []) {
  var listData = [modelOfDatafeatherModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				name: val.name ?? null,
				is_all: val.is_all ?? null,
				user_id: val.user_id ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOffeatherModel(data = null) {
  var objectData = modelOfDatafeatherModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.name = data.name ?? null;
		objectData.is_all = data.is_all ?? null;
		objectData.user_id = data.user_id ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOffeatherModel: listOffeatherModel,
  objectOffeatherModel: objectOffeatherModel,
};




  