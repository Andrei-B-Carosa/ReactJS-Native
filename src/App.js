import React, { useState, useEffect } from 'react';

const EmployeeSearch = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalData, setModalData] = useState({});

  const apiUrl = 'https://5fdb12ee91f19e00173339f5.mockapi.io/employee';

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setEmployeeList(data);
        setFilteredEmployees(data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if(query !== ''){
      const filtered = employeeList.filter(employee => employee.fullname.toLowerCase().includes(query));
      setFilteredEmployees(filtered);
    }
 
  };
  
  const handleReset = () => {
    setSearchQuery('');
    setFilteredEmployees(employeeList);
  };

  const handleEdit = (id) => {
    fetch(`${apiUrl}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setModalVisible(true);
      setModalContent(`Employee Information`);
      setModalData(data);
    })
    .catch((error) => console.error('Error fetching employee details:', error));
    // setModalVisible(true);
    // setModalContent(`Edit employee with ID: ${id}`);
  };

  const handleDelete = (id) => {

  };

  const handleSave = () =>{

  }

  const closeModal = () => {
    setModalVisible(false);
    setModalContent('');
  };

  return (
    <div>

      <div className="d-flex mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search employees..."
          className="form-control me-2"
        />
        <button className="btn btn-sm btn-primary me-2" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-sm btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Position</th>
            <th>Section</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.fullname || '--'}</td>
              <td>{employee.position || '--'}</td>
              <td>{employee.section || '--'}</td>
              <td>{employee.status || '--'}</td>
              <td onClick={(e) => {
                    const button = e.target.closest('button').dataset;
                    if (button) {

                      let action = button.action;
                      let param1 = button.id;

                      if(action && param1){
                        if(action === 'edit'){
                          handleEdit(param1);
                        }else if(action === 'delete'){
                          handleDelete(param1);
                        }
                      }

                    }
                  }}
              >
                <button className="btn btn-sm btn-primary" data-action="edit" data-id={employee.id}>Edit</button> &nbsp;
                <button className="btn btn-sm btn-danger" data-action="delete" data-id={employee.id}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
          <div className="modal fade show" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalContent}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="fullnameInput" className="form-label">Full Name:</label>
                    <input
                      type="text"
                      id="fullnameInput"
                      className="form-control"
                      value={modalData.fullname || ''}
                      onChange={(e) => setModalData({ ...modalData, fullname: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="positionInput" className="form-label">Position:</label>
                    <input
                      type="text"
                      id="positionInput"
                      className="form-control"
                      value={modalData.position || ''}
                      onChange={(e) => setModalData({ ...modalData, position: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sectionInput" className="form-label">Section:</label>
                    <input
                      type="text"
                      id="sectionInput"
                      className="form-control"
                      value={modalData.section || ''}
                      onChange={(e) => setModalData({ ...modalData, section: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="statusInput" className="form-label">Status:</label>
                    <select 
                      className="form-control"
                      value={modalData.status || ''}
                      onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                    >
                      <option value="">-Select Status-</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}
  </div>
  );
};

export default EmployeeSearch;