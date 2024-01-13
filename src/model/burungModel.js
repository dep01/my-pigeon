// HOW TO IMPORT ?
// const Convert = require('location/burungModel.js');
// OR
// import Convert from 'location/burungModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfburungModel(data)
// FOR ARRAY
// const data = Convert.listOfburungModel(data)
const modelOfDataburungModel = {
  bulu: '',
  chip: '',
  dikandang: '',
  harga: '',
  induk_betina: '',
  induk_jantan: '',
  data_induk: [],
  jenis: '',
  kecepatan: '',
  kelamin: '',
  kode_trah: '',
  lahir: '',
  lepas_terjauh: '',
  nama: '',
  note: '',
  pemilik: '',
  prestasi: '',
  qty: '',
  ring_no: '',
  tempat_beli: '',
  trah: '',
  umur_bulan: '',
  umur_tahun: '',
};
function listOfburungModel(data = []) {
  var listData = [modelOfDataburungModel];
  listData = [];
  try {
    data.map(val => {
      var data_induk = [
        {
          type: '',
          ring_no: '',
        },
      ];
      data_induk = [];
      if (val.induk_betina) {
        data_induk.push({
          type: 'FEMALE',
          ring_no: val.induk_betina,
        });
      }
      if (val.induk_jantan) {
        data_induk.push({
          type: 'MALE',
          ring_no: val.induk_jantan,
        });
      }
      var object = {
        bulu: val.bulu ?? '',
        chip: val.chip ?? '',
        dikandang: val.dikandang ?? '',
        harga: val.harga ?? null,
        data_induk: data_induk,
        induk_betina: val.induk_betina ?? '',
        induk_jantan: val.induk_jantan ?? '',
        jenis: val.jenis ?? '',
        kecepatan: val.kecepatan ?? null,
        kelamin: val.kelamin ?? '',
        kode_trah: val.kode_trah ?? '',
        lahir: val.lahir ?? '',
        lepas_terjauh: val.lepas_terjauh ?? '',
        nama: val.nama ?? '',
        note: val.note ?? '',
        pemilik: val.pemilik ?? '',
        prestasi: val.prestasi ?? '',
        qty: val.qty ?? '',
        ring_no: val.ring_no ?? '',
        tempat_beli: val.tempat_beli ?? '',
        trah: val.trah ?? '',
        umur_bulan: val.umur_bulan ?? null,
        umur_tahun: val.umur_tahun ?? null,
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfburungModel(data = null) {
  var objectData = modelOfDataburungModel;
  if (data == null) {
    return null;
  }
  try {
    var data_induk = [
      {
        type: '',
        ring_no: '',
      },
    ];
    data_induk = [];
    if (data.induk_betina) {
      data_induk.push({
        type: 'FEMALE',
        ring_no: data.induk_betina,
      });
    }
    if (data.induk_jantan) {
      data_induk.push({
        type: 'MALE',
        ring_no: data.induk_jantan,
      });
    }
    objectData.bulu = data.bulu ?? '';
    objectData.chip = data.chip ?? '';
    objectData.dikandang = data.dikandang ?? '';
    objectData.harga = data.harga ?? null;
    objectData.induk_betina = data.induk_betina ?? '';
    objectData.induk_jantan = data.induk_jantan ?? '';
    objectData.data_induk = data_induk;
    objectData.jenis = data.jenis ?? '';
    objectData.kecepatan = data.kecepatan ?? null;
    objectData.kelamin = data.kelamin ?? '';
    objectData.kode_trah = data.kode_trah ?? '';
    objectData.lahir = data.lahir ?? '';
    objectData.lepas_terjauh = data.lepas_terjauh ?? '';
    objectData.nama = data.nama ?? '';
    objectData.note = data.note ?? '';
    objectData.pemilik = data.pemilik ?? '';
    objectData.prestasi = data.prestasi ?? '';
    objectData.qty = data.qty ?? '';
    objectData.ring_no = data.ring_no ?? '';
    objectData.tempat_beli = data.tempat_beli ?? '';
    objectData.trah = data.trah ?? '';
    objectData.umur_bulan = data.umur_bulan ?? null;
    objectData.umur_tahun = data.umur_tahun ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfburungModel: listOfburungModel,
  objectOfburungModel: objectOfburungModel,
};
