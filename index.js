const request = require("axios");
// const request = require('request')

const dayjs = require("dayjs");

var today = dayjs().format("YYYY-MM-DD");

// const request = new Axios({});

// const appid = 'wx3a426761d23d42b3'
const appid = "wxc7d4b27d21d142d6";

// const app_screct = 'AAQ9G7sEAAABAAAAAADWcttanYP2j10WlDD+YiAAAAAraAdzKm8i8JwFJ68cDOJBtIHsmv3F8e00LCv7f+tYvlGHOmrBarkElb9EIUCyp6QZ/Ky7vD8IAq1ghjCX7KS74kNcXa5LLZiKDzzQQB8XykmyqiaOqma6v6Y/LZjuU+2/jTVellaAO+oYWdJYRXPwWvyVNkrwNbWBzQ=='
const app_screct = "d1b94f11904d5aee13e5fb338b7423af";
// let token =
//   "59_FrPBeMRuL1sa_MsTVECBHOf5UDFi_Toar7PBxz5nzCVRfoLYY32MCA_VtbK4ww4OgF87IghUT9QHHaa9JM3bK496Ud6bjdjAknfIgJklCy6IIbLaojC4PRuiQMXaFHTUH6miL3ZZqfn8uyEyBCDcAGAXYZ";

const tianqiAppkey = "9731d734cb7c690f408d7c6b36967d3b";
// https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
const to_user_hxx = 'om-Vy6LZYbzca6xKghw6sBmyVi94'

const to_user_qxx = 'om-Vy6LQJZd7xtNXmC1-z55386mY'

const template_id = 'hNFu2m0lswcgaLm9fKBJbW47fZZwZSHVGnD6VXo4-h4'

/**
 * 
 * @returns {
      "area": "上海市",
      "date": "2020-03-23",
      "week": "星期二",
      "weather": "晴转多云",
      "weatherimg": "yun.png",
      "real": "18℃",
      "lowest": "6℃",
      "highest": "22℃",
      "wind": "东北风",
      "winddeg": "121",
      "windspeed": "7",
      "windsc": "1-2级",
      "sunrise": "06:10",
      "sunset": "18:31",
      "moonrise": "06:02",
      "moondown": "17:22",
      "pcpn": "0.0",
      "pop": "1",
      "uv_index": "9",
      "vis": "25",
      "humidity": "23",
      "tips": "天气暖和，适宜着单层棉麻面料的短套装、T恤衫、薄牛仔衫裤、休闲服、职业套装等春秋过渡装。年老体弱者请适当增减衣服。"
    }
 */
const getTianQi = async () => {
  try {
    const res = await request.get("http://api.tianapi.com/tianqi/index", {
      params: {
        key: tianqiAppkey,
        city: "北京市",
      },
    });
    return res.data.newslist[0];
  } catch (error) {
    console.log(error);
  }

  return {};
};

// tqtype 1=风、2=云、3=雨、4=雪、5=霜、6=露 、7=雾、8=雷、9=晴、10=阴。
/**
 * 
@returns {
      "tqtype": 3,
      "content": "东边日出西边雨，道是无晴却有晴",
      "author": "刘禹锡",
      "source": "竹枝词"
    }
 */
const getTianQiShiju = async (tqtype) => {
  //需要安装request模块
  const res = await request.get("http://api.tianapi.com/tianqishiju/index", {
    params: {
      key: tianqiAppkey,
      tqtype,
    },
  });

  return res.data.newslist[0] || {};
};

/**
 * @returns "用努力去喂养梦想，愿跌倒不哭，明媚如初，早安。"
 */
const getZaoan = async () => {
  //需要安装request模块
  const res = await request.get("http://api.tianapi.com/zaoan/index", {
    params: {
      key: tianqiAppkey,
    },
  });

  return res.data.newslist?.[0]?.content || "加油加油加油";
};

function timesize(beginDate, endDate) {
    if (beginDate != '' && endDate != '') {
        var aDate, oDate1, oDate2, iDays;
        if (beginDate.length == 8) {
            beginDate = beginDate.substr(0, 4) + '-' + beginDate.substr(4, 2) + '-' + beginDate.substr(6, 2);
        }
        if (endDate.length == 8) {
            endDate = endDate.substr(0, 4) + '-' + endDate.substr(4, 2) + '-' + endDate.substr(6, 2);
        }
        aDate = beginDate.split("-");
        oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为12/13/2008格式
        aDate = endDate.split("-");
        oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
        var i = (oDate1 - oDate2) / 1000 / 60 / 60 / 24;

        iDays = i; //把相差的毫秒数转换为天数
        return iDays;
    } else {
        return 0;
    }
}

/**
 * 
 * @returns {
    tianqi: {

    },

    shiju: {
    "tqtype": 3,
        "content": "东边日出西边雨，道是无晴却有晴",
        "author": "刘禹锡",
        "source": "竹枝词"
    },

    zaoan: {

    },
}
 */
const getCaihunData = async () => {
  try {
    const tianqi = await getTianQi();
    const shiju = await getTianQiShiju(3);
    const zaoan = await getZaoan();

    return {
      tianqi,
      shiju,
      zaoan,
      hunli: Math.abs(timesize(today, '2022.10.3')),
      love_day: timesize(today, '2019.12.28'),
      married: Math.abs(timesize(today, '2022.8.4')),
    };
  } catch (error) {
    console.log(error)
  }
};

// console.log(getCaihunData())

const getToken = async () => {
  request
    .get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${app_screct}`
    )
    .then((res) => {
      console.log("res", res.data);

      sendMessage(res.data.access_token);

      sendMessage(res.data.access_token, to_user_hxx, 'HXX')
    })
    .catch((err) => {
      console.log("err", err);
    });
};


const sendMessage = async (token, user = to_user_qxx, name = 'QXX') => {
  const data = await getCaihunData();

  request
    .post(
      `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`,
      {
        touser: user,
        template_id,
        url: "http://weixin.qq.com/download",
        topcolor: "#FF0000",
        data: {
          User: {
            value: name,
            color: "#173177",
          },
          zaoan: {
            value: data.zaoan || '今日三生有幸',
            color: '#76BA99',
          },
          Date: {
            value: data.tianqi?.date || today,
            color: "#173177",
          },
          date: {
            value: data.tianqi?.date || today,
            color: "#173177",
          },
          week: {
            value: data.tianqi.week,
            color: '#173177',
          },
          windspeed: {
            value: data.tianqi.windspeed,
            color: '#173177',
          },
          city: {
            value: data.tianqi?.area || "北京",
            color: "#173177",
          },
          weather: {
            value: data.tianqi?.weather || "晴天",
            color: "#173177",
          },
          temperature: {
            value: data.tianqi?.real || "-",
            color: "#173177",
          },
          min_temperature: {
            value: data.tianqi?.lowest || "-",
            color: "#173177",
          },
          max_temperature: {
            value: data.tianqi?.highest || "-",
            color: "#173177",
          },
          pop: {
            value: data.tianqi?.pop || "-",
            color: "#173177",
          },
          tips: {
            value: data.tianqi?.tips || "一生得此一人，不易，彼此相爱到老，不腻。",
            color: "#173177",
          },
          love_day: {
            value: data.love_day,
            color: "#F4606C",
          },
          married: {
            value: data.married,
            color: "#E6CEAC",
          },
          wedding: {
            value: data.hunli,
            color: "#2B7A0B",
          },
          birthday1: {
            value: "0",
            color: "#173177",
          },
          birthday2: {
            value: "0",
            color: "#173177",
          },
          shici: {
            value: data.shiju?.content,
            color: "#7DCE13",
          },
          shici_source: {
            value: data.shiju?.source,
            color: "#7DCE13",
          },
          shici_author: {
            value: data.shiju?.author,
            color: "#7DCE13",
          }
        },
      }
    )
    .then((res) => {
      console.log("res", res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

getToken();


// {{date.DATA}} - {{week.DATA}} 
// 城市：{{city.DATA}} 
// 天气：{{weather.DATA}} 
// 风力: {{windspeed.DATA}}
// 最低气温: {{min_temperature.DATA}} 
// 最高气温: {{max_temperature.DATA}} 
// 降雨概率：{{pop.DATA}}% 
// 今日Tips：{{tips.DATA}} 
// 今天是我们恋爱的第{{love_day.DATA}}天
// 距离婚礼还有{{wedding.DATA}}天 
// 今日鸡汤： 
// {{zaoan.DATA}}