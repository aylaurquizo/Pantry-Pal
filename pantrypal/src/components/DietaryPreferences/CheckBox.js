import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';
import styled from 'styled-components';

const {Panel} = Collapse

export const dietOptions = [
    { "_id": 1, "name": "Vegetarian", "type": "diet", "paramName": "vegetarian" },
    { "_id": 2, "name": "Vegan", "type": "diet", "paramName": "vegan" },
    { "_id": 3, "name": "Pescatarian", "type": "diet", "paramName": "pescetarian" },
    { "_id": 4, "name": "Keto", "type": "diet", "paramName": "ketogenic" },
    { "_id": 5, "name": "Paleo", "type": "diet", "paramName": "paleo" },
    { "_id": 6, "name": "Mediterranean", "type": "diet", "paramName": "mediterranean" },
    { "_id": 7, "name": "Gluten-Free", "type": "diet", "paramName": "gluten free" },
    { "_id": 8, "name": "Dairy-Free", "type": "intolerance", "paramName": "dairy" },
    { "_id": 9, "name": "Nut-Free", "type": "intolerance", "paramName": "tree nut" },
    { "_id": 10, "name": "Soy-Free", "type": "intolerance", "paramName": "soy" },
    { "_id": 11, "name": "Egg-Free", "type": "intolerance", "paramName": "egg" }
];

const StyledCheckbox = styled(Checkbox)`
  &.ant-checkbox-wrapper {
    margin-bottom: 8px; 
    &:hover .ant-checkbox-inner {
      border-color: #1a73e8; 
    }
  }

  .ant-checkbox-inner {
    border-radius: 10px;
    border-width: 2px;
  }
  
  & .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1a73e8; 
    border-color: #1a73e8;
  }
`;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if(currentIndex === -1){
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked);
    }

    const renderCheckboxLists = () => dietOptions.map((value, index) => (
        <React.Fragment key={index}>
            <StyledCheckbox
                onChange={()=>handleToggle(value._id)}
                type="checkbox"
                checked = {Checked.indexOf(value._id) !== -1}
            > {value.name}</StyledCheckbox>
        </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header = "Filter by Diet or Intolerance" key="1">
            {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox