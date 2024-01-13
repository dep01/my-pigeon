// HOW TO IMPORT ?
// const Convert = require('location/pigeonModel.js');
// OR
// import Convert from 'location/pigeonModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfpigeonModel(data)
// FOR ARRAY
// const data = Convert.listOfpigeonModel(data)
const modelOfDatapigeonModel = {
  id: '',
  name: '',
  ring_no: '',
  type: '',
  chip_no: null,
  birth: null,
  achievement: null,
  father_id: null,
  mother_id: null,
  feather_colors_id: '',
  feather_color: '',
  father_ring_no: null,
  father_name: null,
  father_chip_no: null,
  mother_ring_no: null,
  mother_name: null,
  mother_chip_no: null,
  pigeon_status: null,
  pigeon_status_name: null,
  parent_data: [],
};
function listOfpigeonModel(data = []) {
  var listData = [modelOfDatapigeonModel];
  listData = [];
  try {
    data.map(val => {
      var parent_data = [
        {
          type: '',
          ring_no: '',
        },
      ];
      parent_data = [];
      if (val.mother_ring_no) {
        parent_data.push({
          type: 'HEN',
          ring_no: val.mother_ring_no,
        });
      }
      if (val.father_ring_no) {
        parent_data.push({
          type: 'COCK',
          ring_no: val.father_ring_no,
        });
      }
      var object = {
        id: val.id ?? null,
        name: val.name ?? null,
        ring_no: val.ring_no ?? null,
        type: val.type ?? null,
        chip_no: val.chip_no ?? null,
        birth: val.birth ?? null,
        achievement: val.achievement ?? null,
        parent_data: parent_data,
        father_id: val.father_id ?? null,
        mother_id: val.mother_id ?? null,
        feather_colors_id: val.feather_colors_id ?? null,
        feather_color: val.feather_color ?? null,
        father_ring_no: val.father_ring_no ?? null,
        father_name: val.father_name ?? null,
        father_chip_no: val.father_chip_no ?? null,
        mother_ring_no: val.mother_ring_no ?? null,
        mother_name: val.mother_name ?? null,
        mother_chip_no: val.mother_chip_no ?? null,
        pigeon_status: val.pigeon_status ?? null,
        pigeon_status_name: val.pigeon_status_name ?? null,
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfpigeonModel(data = null) {
  var objectData = modelOfDatapigeonModel;
  if (data == null) {
    return null;
  }
  try {
    var parent_data = [
      {
        type: '',
        ring_no: '',
      },
    ];
    parent_data = [];
    if (data.mother_ring_no) {
      parent_data.push({
        type: 'HEN',
        ring_no: data.mother_ring_no,
      });
    }
    if (data.father_ring_no) {
      parent_data.push({
        type: 'COCK',
        ring_no: data.father_ring_no,
      });
    }
    objectData.id = data.id ?? null;
    objectData.name = data.name ?? null;
    objectData.ring_no = data.ring_no ?? null;
    objectData.type = data.type ?? null;
    objectData.chip_no = data.chip_no ?? null;
    objectData.birth = data.birth ?? null;
    objectData.achievement = data.achievement ?? null;
    objectData.father_id = data.father_id ?? null;
    objectData.mother_id = data.mother_id ?? null;
    objectData.feather_colors_id = data.feather_colors_id ?? null;
    objectData.feather_color = data.feather_color ?? null;
    objectData.father_ring_no = data.father_ring_no ?? null;
    objectData.father_name = data.father_name ?? null;
    objectData.father_chip_no = data.father_chip_no ?? null;
    objectData.mother_ring_no = data.mother_ring_no ?? null;
    objectData.mother_name = data.mother_name ?? null;
    objectData.mother_chip_no = data.mother_chip_no ?? null;
    objectData.pigeon_status = data.pigeon_status ?? null;
    objectData.pigeon_status_name = data.pigeon_status_name ?? null;
    objectData.parent_data = data.parent_data;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfpigeonModel: listOfpigeonModel,
  objectOfpigeonModel: objectOfpigeonModel,
};
