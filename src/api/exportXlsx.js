import * as XLSX from 'xlsx'
 
const createExcel = function(obj) {
   
	let module = obj
	let _root = document.children[0]
	let root = document.createElement('div')
	root.setAttribute('data-id', "export-s")
	root.style.display = "none"
	_root.appendChild(root)
 
	html();
	
	function html() {
		let Name = module.columnName.split(","); //转成数组
		let Value = module.columnValue.split(",");
		let table = document.createElement('table');
		table.setAttribute('data-id', "table1-expot-on1")
		table.setAttribute('border', "1")
		let str =
			`<thead> <tr> <td  colspan="${Name.length}" style="text-align:center;">${module.fileName}</td></tr><tr id='table-thead-tr-ex'></tr></thead><tbody id='table-tbody-tr-ex'></tbody>`
		table.innerHTML = str
		let tbody = table.children[1];
		let thead = table.children[0].children[1];
		Name.map((item) => {
			let td = document.createElement('td')
			td.innerText = `${item}`
			thead.appendChild(td);
		});
		module.data.map((m) => {
			let ctr = document.createElement('tr')
			Value.map((item) => {
				let td = document.createElement('td')
				td.innerText = `${m[item]}`
				ctr.appendChild(td);
			});
			tbody.appendChild(ctr);
		});
		root.appendChild(table);
		exports();
	}
 
	function exports() {
		let table1 = root.children[0]
		let newOptions = {
			raw: true //如果为真，每个单元格数据都将保存为原始字符串
		}
		let sheet = XLSX.utils.table_to_sheet(table1, newOptions); //将一个table对象转换成一个sheet对象
		sheet['!cols'] = [];
		Object.keys(sheet).map(item => {
			sheet['!cols'].push({
				wpx: 90
			}) //修改列宽
			return item
		})
		openDownloadDialog(sheet2blob(sheet), module.fileName + '.xlsx');
	}
 
	function sheet2blob(sheet, sheetName) {
		sheetName = sheetName || 'sheet1';
		let workbook = {
			SheetNames: [sheetName],
			Sheets: {}
		};
		workbook.Sheets[sheetName] = sheet; // 生成excel的配置项
 
		let wopts = {
			bookType: 'xlsx', // 要生成的文件类型
			bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
			type: 'binary'
		};
		let wbout = XLSX.write(workbook, wopts);
		let blob = new Blob([s2ab(wbout)], {
			type: "application/octet-stream"
		}); // 字符串转ArrayBuffer
		function s2ab(s) {
			let buf = new ArrayBuffer(s.length);
			let view = new Uint8Array(buf);
			for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
			return buf;
		}
		return blob;
	}
 
	function openDownloadDialog(url, saveName) {
		if (typeof url == 'object' && url instanceof Blob) {
			url = URL.createObjectURL(url); // 创建blob地址
		}
		let aLink = document.createElement('a');
		aLink.href = url;
		aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
		let event;
		if (window.MouseEvent) event = new MouseEvent('click');
		else {
			event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		}
		aLink.dispatchEvent(event);
		root.remove();
	}
	
}
 
export default createExcel