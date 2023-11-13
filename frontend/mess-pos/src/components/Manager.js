import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const Manager = () => {
  return (
    <main>
    <Tabs defaultActiveKey="inventory">
      <Tab eventKey="inventory" title="Inventory">
        {/* Content for inventory tab */}
        Inventory
      </Tab>
      <Tab eventKey="menu" title="Menu">
        {/* Content for Menu tab */}
        Menu
      </Tab>
      <Tab eventKey="usage" title="Usage">
        {/* Product Usage */}
        Product Usage
      </Tab>
      <Tab eventKey="sales" title="Sales">
        {/* Sales Report */}
        Sales
      </Tab>
      <Tab eventKey="excess" title="Excess">
        {/* Excess Report */}
        Excess Report
      </Tab>
      <Tab eventKey="restock" title="Restock">
        {/* Restock Report*/}
        Restock
      </Tab>
      <Tab eventKey="trends" title="Trends">
        {/* Ordering Trends (What sells together) */}
        Ordering Trends
      </Tab>
    </Tabs>
    </main>
  )
}

export default Manager