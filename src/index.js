import { add } from 'lodash';
import './style.css';
import {makeWebpage, makeCard} from './webpage/page.js';
import makeButton from './webpage/buttons.js';
import makeForm from './webpage/form.js';


const content = () => {
  const content = document.getElementById('content');
  const page = makeWebpage();
  
  const header = page.header;
  const sidebar = page.sidebar;
  const main = page.main;
  const footer = page.footer;
  
  content.append(header);
  content.append(sidebar);
  content.append(main);
  content.append(footer);
  
  //const card = makeCard();

  // main.append(makeCard());
  // main.append(makeCard());
  //const btnAddTask = makeButton('add-task', 'Add');
  //console.log(btnAddTask.id);
  //main.append(btnAddTask)
  //const addListener = addTaskListener(btnAddTask);
  const form = makeForm();
  main.append(form);


  const nav = navigate();
};

const addTaskListener = (btnPressed) => {
  const btn = document.querySelector(`#${btnPressed.id}`);
  btn.addEventListener('click', () => {
    main.append(makeCard());
  });
}

// TODO!!
const navigate = () => {
  const main = document.getElementById('main');
  const addBtn = document.querySelector('#add-task');
  const cancelBtn = document.querySelector('#cancel-task');
  const createBtn = document.querySelector('#create-task');
  
  addBtn.addEventListener('click', () => {
    //main.append(form);
  });
  cancelBtn.addEventListener('click', () => {
    //main.remove(form);
  });
};

content();