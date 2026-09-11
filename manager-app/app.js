// 第一步：添加记录与统一渲染（含输入校验）
const form = document.querySelector('#add-form');
const dateInput = document.querySelector('#date-input');
const typeInput = document.querySelector('#type-input');
const durationInput = document.querySelector('#duration-input');
const notesInput = document.querySelector('#notes-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#record-list');

// 唯一状态：记录数组
let records = [];

// 统一渲染：先改数组、再调render
const render = () => {
  list.innerHTML = '';
  if (records.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = '暂无记录，开始记录你的健身之旅吧';
    list.appendChild(li);
    return;
  }
  records.forEach(record => {
    const li = document.createElement('li');
    li.className = 'record';

    const head = document.createElement('div');
    head.className = 'record-head';

    const typeTag = document.createElement('span');
    typeTag.className = 'type';
    typeTag.textContent = record.type;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    dateSpan.textContent = record.date;

    const durSpan = document.createElement('span');
    durSpan.className = 'duration';
    durSpan.textContent = record.duration + '分钟';

    head.appendChild(typeTag);
    head.appendChild(dateSpan);
    head.appendChild(durSpan);

    const notesDiv = document.createElement('div');
    notesDiv.className = 'notes';
    notesDiv.textContent = record.notes || '无备注';

    li.appendChild(head);
    li.appendChild(notesDiv);
    list.appendChild(li);
  });
};

// 表单提交：读值、校验、改数组、重画
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = dateInput.value;
  const type = typeInput.value;
  const duration = durationInput.value;
  const notes = notesInput.value.trim();

  // 校验三件套：读值trim、判空给提示、失败return
  if (!date) {
    tip.textContent = '请选择日期';
    return;
  }
  if (!type) {
    tip.textContent = '请选择运动类型';
    return;
  }
  if (!duration || Number(duration) <= 0) {
    tip.textContent = '时长必须大于0分钟';
    return;
  }

  records.push({
    date: date,
    type: type,
    duration: Number(duration),
    notes: notes
  });
  tip.textContent = '';
  form.reset();
  render();
});

render();
