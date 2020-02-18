import Mock from 'mockjs';

const Result = [];

const shanghaiTrue = [2, 6, 9, 16, 20, 33, 40, 53, 66, 96, 112, 135, 169, 182, 203, 219, 243, 257, 277, 286, 293, 299, 303, 311]


var dateTime=new Date("2020-01-21");
var j = 0
for (let i of shanghaiTrue) {
    Result.push(Mock.mock({
    true: i,
    predict: Mock.Random.integer(j, i),
    date: dateTime,
  }));
  j = i
  dateTime=dateTime.setDate(dateTime.getDate()+1);
  dateTime=new Date(dateTime);
}

export { Result };