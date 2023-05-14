document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

  document.querySelector('#compose-form').addEventListener('submit', function(event){
    event.preventDefault();
    send_email();
    load_mailbox();
  })
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

let email_list = document.getElementById("emails-view");

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

fetch('/emails/inbox')
  .then(response => response.json())
  .then(emails => {
    // Print emails
    console.log(emails);
    email_list.innerHTML = `<h2>${emails.subject}</h2><h4>${emails.sender}</h4><h4>${emails.recipients}</h4><h4>${emails.body}</h4>`;
    
    // ... do something else with emails ...
    
})};

// const recipientsx = document.querySelector("compose-recipients").value
// const subjectx = document.querySelector("compose-subject").value
// const bodyx = document.querySelector("compose-body").value

// document.getElementById("submit").addEventListener('click', (e) => send_email());
let send_email = () => {

  // event.preventDefault(); // prevent default form submission 

  let recipientsx = document.getElementById("compose-recipients").value
  let subjectx = document.getElementById("compose-subject").value
  let bodyx = document.getElementById("compose-body").value

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipientsx,
        subject: subjectx,
        body: bodyx
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
  });
};

// const submitBtn = document.getElementById("send");
// submitBtn.addEventListener("click", function(){
//   send_email();
// })

// let submit = document.getElementById("send");
// if (submit) {
//   document.getElementById("send").addEventListener("click", send_email);
// };

// window.onload=function(){
//   let submit = document.getElementById("send");
//   document.getElementById("send").addEventListener("click", send_email);
// }

// submit.addEventListener("click", send_email);

// document.getElementById("send").addEventListener('click', (e) => send_email());

// document.querySelector('#btn btn-primary').addEventListener('click', send_email)

// document.getElementById("compose-form").submit(send_email);