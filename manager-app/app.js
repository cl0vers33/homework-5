// 第三步：localStorage本地保存
const form = document.querySelector('#add-form');
const dateInput = document.querySelector('#date-input');
const typeInput = document.querySelector('#type-input');
const durationInput = document.querySelector('#duration-input');
const notesInput = document.querySelector('#notes-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#record-list');
const searchInput = document.querySelector('#search-input');

// 启动时恢复数据：没有存档时 || '[]' 保证得到空数组而非 null
let records = JSON.parse(localStorage.getItem('records') || '[]');
// 当前搜索关键词（查询功能）
let currentKeyword = '';

// 每次修改数组后调用：对象→JSON字符串
const save = () => localStorage.setItem('records', JSON.stringify(records));

// 统一渲染：先改数组、再调render
const render = () => {
  list.innerHTML = '';
  // 查询过滤：按类型或备注匹配关键词
  const shown = records.filter(r =>
    !currentKeyword ||
    r.type.includes(currentKeyword) ||
    (r.notes && r.notes.includes(currentKeyword))
  );
  if (shown.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = currentKeyword ? '没有匹配的记录' : '暂无记录，开始记录你的健身之旅吧';
    list.appendChild(li);
    return;
  }
  shown.forEach(record => {
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

    // 删除按钮
    const del = document.createElement('span');
    del.className = 'del';
    del.textContent = '删除';
    del.addEventListener('click', () => {
      records = records.filter(r => r !== record);
      save();
      render();
    });

    head.appendChild(typeTag);
    head.appendChild(dateSpan);
    head.appendChild(durSpan);
    head.appendChild(del);

    const notesDiv = document.createElement('div');
    notesDiv.className = 'notes';
    notesDiv.textContent = record.notes || '无备注';

    li.appendChild(head);
    li.appendChild(notesDiv);
    list.appendChild(li);
  });
};

// 表单提交：读值、校验、改数组、保存、重画
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
  save();
  tip.textContent = '';
  form.reset();
  render();
});

// 查询功能：input事件实时过滤
searchInput.addEventListener('input', (e) => {
  currentKeyword = e.target.value.trim();
  render();
});

render();
