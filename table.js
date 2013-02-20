	var a = 15;

window.onload = function(){makeTable();}

function whatDay(day) {
	
	switch (day)
		{
		case 0:
		  x="Sunday";
		  break;
		case 1:
		  x="Monday";
		  break;
		case 2:
		  x="Tuesday";
		  break;
		case 3:
		  x="Wednesday";
		  break;
		case 4:
		  x="Thursday";
		  break;
		case 5:
		  x="Friday";
		  break;
		case 6:
		  x="Saturday";
		  break;
		} 
	return x;
	}

function makeTable() {

	row=new Array();
	cell=new Array();
	date=new Array();
	dateName=new Array();

	var dat = new Date();

	row_num=a;
	cell_num=1;

	tab=document.createElement('table');
	tab.setAttribute('id','newtable');

	tbo=document.createElement('tbody');

	for(c=0;c<row_num;c++){
	row[c]=document.createElement('tr');
	date[c]=dat;
	dateName[c]= whatDay(dat.getDay()) + "\n" + dat.getDate() + "/" + (dat.getMonth()+1) + "/" + dat.getFullYear();
	dat.setDate(dat.getDate() + 1);
		//sets the dates to each element of the Array date[].
	
	
	
		for(k=0;k<cell_num;k++) {
		cell[k]=document.createElement('td');

		var bt = document.createElement('input');
		bt.type = 'button';
		bt.id = c;
		bt.style.backgroundColor = 'transparent';
		bt.value = dateName[c];
		bt.style.width = 100;
		bt.sel = false;
		bt.onclick = select;
			//Outputs a button with the date written on it.

		cell[k].appendChild(bt);
		row[c].appendChild(cell[k]);
		}
	
	tbo.appendChild(row[c]);
	}
	tab.appendChild(tbo);
    document.getElementById('dates').appendChild(tab);
	}

function select() {

	buttons=new Array();

	for(c=0;c<a;c++) {
	buttons[c]=document.getElementById(c);
	}
	

	if (event.shiftKey) {
		if (isOneSel(buttons)) {

		var b=whichIsSel(buttons);

		for (i=Math.min(b,this.id);i<=Math.max(this.id,b);i++) {
		document.getElementById(i).style.backgroundColor = 'red';
		document.getElementById(i).sel = true;

		}
	
		} else {

			deselectAll();
			this.style.backgroundColor = 'red';
			this.sel = true;
		}

	
	} else {
		deselectAll();
		this.style.backgroundColor = 'red';
		this.sel = true;
	}

	}


function deselectAll() {
	
	for(c=0;c<a;c++) {
	document.getElementById(c).style.backgroundColor = 'transparent';
	document.getElementById(c).sel = false;
	}
	}

function isOneSel(array) {

	if (whichIsSel(array) == -1) {
	return false;
	} else {
	return true;
	}
	}

function whichIsSel(array) {

	n=array.length;

	var x=-1;
	
	for(i=0;i<n;i++) {
		if (array[i].sel == true) {
		x = i;
		} else {
		Math.max(x,-1);
		}
	}
	return x;

	}






