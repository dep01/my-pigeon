import Moment from 'moment';
import create from 'zustand';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import {ADS_STRING, SESSION} from 'rbase-helpers/constants';
import {getSession, setSession} from './session';

export const limit_table =10;
export const global_base_state = props => {
  return {
    toastRef: props?.toastRef ?? null,
    isLoading: props?.isLoading ?? true,
    modal_message: props?.modal_message ?? '',
    modal_title: props?.modal_title ?? '',
    modal_icon: props?.modal_icon ?? '',
    show_modal: props?.show_modal ?? false,
    modal_confirmation_message: props?.modal_confirmation_message ?? '',
    modal_confirmation_title: props?.modal_confirmation_title ?? '',
    modal_confirmation_icon: props?.modal_confirmation_icon ?? '',
    show_confirmation_modal: props?.show_confirmation_modal ?? false,
    modal_confirmation_ok: props?.modal_confirmation_ok ?? null,
    ads_ready: props?.ads_ready ?? false,
    ads_loaded: props?.ads_loaded ?? false,
    intertitial: props?.intertitial ?? null,
  };
};
const count_ads = 3;
export const globalStore = create(set => global_base_state());
export const setter_global_state = {
  toastRef: (value = null) => globalStore.setState({toastRef: value}),
  isLoading: (value = false) => globalStore.setState({isLoading: value}),
  show_modal: (value = false) => globalStore.setState({show_modal: value}),
  modal_message: (value = '') => globalStore.setState({modal_message: value}),
  modal_title: (value = '') => globalStore.setState({modal_title: value}),
  modal_icon: (value = '') => globalStore.setState({modal_icon: value}),
  show_confirmation_modal: (value = false) =>
    globalStore.setState({show_confirmation_modal: value}),
  modal_confirmation_title: (value = '') =>
    globalStore.setState({modal_confirmation_title: value}),
  modal_confirmation_message: (value = '') =>
    globalStore.setState({modal_confirmation_message: value}),
  modal_confirmation_icon: (value = '') =>
    globalStore.setState({modal_confirmation_icon: value}),
  modal_confirmation_ok: (value = null) =>
    globalStore.setState({
      modal_confirmation_ok: value,
    }),
  ads_loaded: (value = false) => globalStore.setState({ads_loaded: value}),
  ads_ready: (value = false) => globalStore.setState({ads_ready: value}),
  intertitial: (value = null) => globalStore.setState({intertitial: value}),
};
export function globalToast({message = '', type = ''}) {
  const toastRef = globalStore.getState().toastRef;
  toastRef?.current?.show(message, {type}) ?? null;
}
export function globalModal({
  message = '',
  title = 'ERROR!',
  icon = 'close-circle-outline',
}) {
  setter_global_state.modal_icon(icon);
  setter_global_state.modal_title(title);
  setter_global_state.modal_message(message);
  setter_global_state.show_modal(true);
}

export function globalModalConfirmation({
  action,
  message = '',
  title = 'CONFIRM',
  icon = 'alert-circle-outline',
}) {
  setter_global_state.modal_confirmation_icon(icon);
  setter_global_state.modal_confirmation_title(title);
  setter_global_state.modal_confirmation_message(message);
  setter_global_state.modal_confirmation_ok(action);
  setter_global_state.show_confirmation_modal(true);
}
export const toastProps = {
  placement: {
    BOTTOM: 'bottom',
    TOP: 'top',
    CENTER: 'center',
  },
  animationType: {
    SLIDE_IN: 'slide-in',
    ZOOM_IN: 'zoom-in',
  },
  type: {
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    NORMAL: 'normal',
  },
};
export function SysCurrencyTransform({num = 0, currency = 'IDR'}) {
  return (
    currency + ' ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  );
}
export function SysGetCurrentTime({lang = 'en', type = 'long'}) {
  const date = new Date();
  return {
    time: `${addZero({num: date.getHours()})}:${addZero({
      num: date.getMinutes(),
    })}:${addZero({num: date.getSeconds()})}`,
    day: SysDay({date: date, lang: lang}),
    date: SysDateTransform({date: date, type: type, lang: lang}),
  };
}
export function addZero({num = 0}) {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}
export function SysDay({date = '', lang = 'en'}) {
  var days = [
    'Sunday',
    'Monday',
    'Thuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dateFormat = new Date(date);
  if (lang != 'en') {
    days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  }
  return days[dateFormat.getDay()];
}
export function SysDateTransform({
  date = '',
  type = 'long',
  checkIsToDay = false,
  lang = 'en',
  withTime = false,
  forSql=false
}) {
  if(date==""){
    return"";
  }
  const current = new Date();
  const dateFormat = new Date(Moment(date, 'YYYY-MM-DD hh:mm:s.SSS'));
  const month = dateFormat.getMonth();
  const year = dateFormat.getFullYear();
  const day = dateFormat.getDate();
  const hour = dateFormat.getHours();
  const minutes = dateFormat.getMinutes();
  const seconds = dateFormat.getSeconds();
  const mili = dateFormat.getMilliseconds();
  let fullOfdate = '';
  if (checkIsToDay) {
    if (
      Moment(current).format('yyyy-MM-DD') ==
      Moment(dateFormat).format('yyyy-MM-DD')
    ) {
      fullOfdate =
        addZero({num: hour}) +
        ':' +
        addZero({num: minutes}) +
        ':' +
        addZero({num: seconds});
    } else {
      fullOfdate =
        addZero({num: day}) +
        ' ' +
        SysMonthTransform(month, type, lang) +
        ' ' +
        year;
    }
  } else {
    fullOfdate =
      addZero({num: day}) +
      ' ' +
      SysMonthTransform(month, type, lang) +
      ' ' +
      year;
  }
  if (withTime) {
    fullOfdate +=
      ' (' +
      addZero({num: hour}) +
      ':' +
      addZero({num: minutes}) +
      ':' +
      addZero({num: seconds}) +
      '.' +
      mili +
      ')';
  }
  if(forSql){
    fullOfdate = `${addZero({num:year})}-${addZero({num:month})}-${addZero({num:day})}`;
    if(withTime){
      fullOfdate += ` ${addZero({num:hour})}:${addZero({num:minutes})}:${addZero({num:seconds})}.${addZero({num:mili})}`;
    }
  }
  return fullOfdate;
}
export function SysMonthTransform(val, type = 'long', lang = 'en') {
  var longMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var shortMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  if (lang == 'in') {
    longMonth = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'July',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    shortMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];
  }
  if (type == 'long') {
    return longMonth[val];
  } else {
    return shortMonth[val];
  }
}
export function SysDecodeHours({time = '', lang = 'en'}) {
  if(time==""){
    return"";
  }
  let hour = 'H';
  let minutes = 'M';
  let seconds = 'S';
  let arr_time = time.split(':');
  return `${parseInt(arr_time[0])} ${hour} ${parseInt(arr_time[1])} ${minutes} ${arr_time[2]} ${seconds}`;
}

export function initIntertitialAds() {
  const interstitial = InterstitialAd.createForAdRequest(
    ADS_STRING.INTERTITIAL,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  setter_global_state.intertitial(interstitial);
  setTimeout(() => {
    const global_state = global_base_state(globalStore.getState());

    global_state.intertitial.load();
    global_state.intertitial.addAdEventListener(AdEventType.LOADED, val => {
      // globalToast({message: 'Adds akan ditampilkan setelah ini.'});
      setter_global_state.ads_ready(true);
    });
  }, 1000);
}

export async function loadAds(func) {
  const global_state = global_base_state(globalStore.getState());
  const count_str = await getSession(SESSION.ADS_COUNT);
  let count = parseInt(count_str ?? '3');
  count++;

  if (count >= count_ads) {
    if (global_state.ads_ready) {
      await setSession(SESSION.ADS_COUNT, '0');
      global_state.intertitial.show();
      setter_global_state.ads_ready(false);
      initIntertitialAds();
      func;
    } else {
      func;
    }
  } else {
    await setSession(SESSION.ADS_COUNT, count.toString());
    func;
  }
}
export function SysOldMonts({date=""}) {
  var months;
  const d1 = new Date(date);
  const d2 = new Date();
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? '0 months' : `${months} months`;
}