import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const {Panel} = Collapse

const diets = [
    {
        "_id": 1,
        "name": "Vegetarian"
    },
    {
        "_id": 2,
        "name": "Vegan"
    },
    {
        "_id": 3,
        "name": "Pescatarian"
    },
    {
        "_id": 4,
        "name": "Keto"
    },
    {
        "_id": 5,
        "name": "Paleo"
    },
    {
        "_id": 6,
        "name": "Mediterranean"
    },
    {
        "_id": 7,
        "name": "Gluten-Free"
    },
    {
        "_id": 8,
        "name": "Dairy-Free"
    },
    {
        "_id": 9,
        "name": "Nut-Free"
    },
    {
        "_id": 10,
        "name": "Soy-Free"
    },
    {
        "_id": 11,
        "name": "Egg-Free"
    }
]


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
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => diets.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={()=>handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            > {value.name}</Checkbox>
        </React.Fragment>
    ))

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header key="1">
            {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBox