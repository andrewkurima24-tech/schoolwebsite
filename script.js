const admin=[
 ["Head Teacher","Overall leadership of the school","Contact via the school office"],
 ["Deputy Head Teacher","Academics and discipline",""],
 ["Director of Studies","Curriculum, timetable and examinations",""],
 ["School Chaplain","Spiritual life and pastoral care",""],
 ["Board of Governors","Policy and oversight on behalf of the Catholic Diocese",""]];
const subjects={
 o:["English","Mathematics","Physics","Chemistry","Biology","History","Geography","CRE","Entrepreneurship","Computer Studies","German","Luganda","Fine Art","Agriculture","Physical Education","Music"],
 a:["General Paper","Sub-Mathematics","Sub-ICT","Physics","Chemistry","Biology","History","Geography","Economics","Entrepreneurship","Literature","Divinity","Art"]};
 const facilities=["Science Laboratories","lab.jpg","Well-equipped labs for Physics, Chemistry and Biology practicals."],
 ["Classroom Blocks","building.jpg","Spacious multi-storey blocks with balconies and open corridors."],
 ["Chapel & Worship","mass.jpg","Regular Masses and prayer, led by clergy and the school chaplain."],
 ["Music & Arts","music.jpg","Violin, choir and band activities that build talent."],
 ["School Bus","bus.jpg","Safe transport for day scholars and school trips."],
 ["Library & ICT","campus.jpg","Library and computer facilities supporting independent study."]];
const news=[
 ["Admissions open for 2027","Applications for S.1 and S.5 are now being received online and at the school office.","2026-10-20"],
 ["Mass with the Bishop","Students joined the Bishop for a colourful Mass and celebration at the school.","2026-10-12"],
 ["Music Showcase","Our violin and choir students performed during the school music day.","2026-09-28"]];
const results={SMUK001:{name:"Demo Student",pin:"1234",term:"Term 3, 2026",marks:{English:78,Mathematics:85,Physics:72,Chemistry:80,Biology:76,History:69}}};
const $=s=>document.querySelector(s), db=(k,v)=>v===undefined?JSON.parse(localStorage.getItem(k)||"[]"):localStorage.setItem(k,JSON.stringify(v));

$("#yr").textContent=new Date().getFullYear();
$("#menuBtn").onclick=()=>$("#nav").classList.toggle("open");
$("#nav").onclick=()=>$("#nav").classList.remove("open");
$("#adminList").innerHTML=admin.map(a=>`<div class="card"><div><h4>${a[0]}</h4><p>${a[1]}</p></div></div>`).join("");
function showSubjects(l){$("#subjectList").innerHTML=subjects[l].map(s=>`<span>${s}</span>`).join("");
 document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.lvl===l));}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>showSubjects(b.dataset.lvl));showSubjects("o");
$("#facList").innerHTML=facilities.map(f=>`<div class="card"><img src="images/${f[1]}" alt="${f[0]}"><div><h4>${f[0]}</h4><p>${f[2]}</p></div></div>`).join("");
$("#newsList").innerHTML=news.map(n=>`<div class="card"><div><small>${n[2]}</small><h4>${n[0]}</h4><p>${n[1]}</p></div></div>`).join("");
$("#gallery").innerHTML=["students","campus","girls","bishop","staff","sign","bus","music"].map(g=>`<img src="images/${g}.jpg" alt="${g}" onclick="window.open(this.src)">`).join("");

$("#applyForm").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target)),a=db("apps");
 d.ref="SMUK-"+new Date().getFullYear()+"-"+String(a.length+1).padStart(4,"0");d.status="Received";d.date=new Date().toLocaleDateString();
 a.push(d);db("apps",a);$("#applyMsg").textContent="Application submitted. Your reference is "+d.ref+". Keep it to track your admission.";e.target.reset();};
$("#trackForm").onsubmit=e=>{e.preventDefault();const r=new FormData(e.target).get("ref").trim().toUpperCase(),a=db("apps").find(x=>x.ref===r);
 $("#trackMsg").textContent=a?`${a.name} (${a.entry}, ${a.type}): ${a.status}. Applied ${a.date}.`:"No application found with that reference.";};
$("#resForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),s=results[f.get("id").trim().toUpperCase()];
 if(!s||s.pin!==f.get("pin").trim()){$("#resOut").innerHTML='<p class="msg">Invalid student ID or PIN.</p>';return;}
 const v=Object.values(s.marks),avg=(v.reduce((a,b)=>a+b,0)/v.length).toFixed(1);
 $("#resOut").innerHTML=`<h3>${s.name} &ndash; ${s.term}</h3><table><tr><th>Subject</th><th>Mark</th></tr>${Object.entries(s.marks).map(([k,m])=>`<tr><td>${k}</td><td>${m}</td></tr>`).join("")}<tr><th>Average</th><th>${avg}</th></tr></table>`;};
$("#contactForm").onsubmit=e=>{e.preventDefault();const m=db("msgs");m.push(Object.fromEntries(new FormData(e.target)));db("msgs",m);
 $("#contactMsg").textContent="Thank you! Your message has been received.";e.target.reset();};
