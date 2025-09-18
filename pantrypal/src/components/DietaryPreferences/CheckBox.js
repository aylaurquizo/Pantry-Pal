import React from 'react'
import { Checkbox, Collapse } from 'antd';
import styled from 'styled-components';
import { useFilters } from '../../contexts/FilterContext';

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

const {Panel} = Collapse

function CheckBox(props) {

    const { selectedIds, updateFilters } = useFilters();

    const handleToggle = (id) => {

        const currentIndex = selectedIds.indexOf(id);
        const newCheckedIds = [...selectedIds];

        if(currentIndex === -1){
            newCheckedIds.push(id)
        } else {
            newCheckedIds.splice(currentIndex, 1)
        }

        updateFilters(newCheckedIds);
    }

    const renderCheckboxLists = () => dietOptions.map((value) => (
        <React.Fragment key={value._id}>
            <StyledCheckbox
                onChange={()=>handleToggle(value._id)}
                checked = {selectedIds.includes(value._id)}
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