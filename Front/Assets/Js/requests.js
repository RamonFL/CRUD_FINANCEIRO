
const server = "http://localhost:3000/";

function SendNewBalanceEntry() {
    const descriptionValue = document.getElementById('inptdesc_id').value;
    const financialValue = document.getElementById('InputValueHTML').value;
    const entryTypeValue = document.getElementById('InputSelect_id').value;
    const entryDateValue = document.getElementById('InputValueData_id').value;

    const endpoint = "criar"
    const xhr = new XMLHttpRequest();
    xhr.open("POST", server + endpoint);

    // Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            
        }
    };

    const bodyRequest =
    {
        description: descriptionValue,
        financial: financialValue,
        entry: entryTypeValue,
        date: entryDateValue
    };

    var body = JSON.stringify(bodyRequest);
    xhr.send(body);
    
}

function DelObject(index) {

    const endpoint = "deletar"
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", server + endpoint);

    // Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            
        }
    };
    
    const bodyRequest =
    {
        id:index
    };

    var body = JSON.stringify(bodyRequest);
    xhr.send(body);
}