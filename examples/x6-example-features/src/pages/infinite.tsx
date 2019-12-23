import React from 'react'
import { Checkbox } from 'antd'
import { Graph, MiniMap } from '@antv/x6'
import './index.less'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

export default class Example extends React.Component {
  private container: HTMLDivElement
  private minimapContainer: HTMLDivElement
  private graph: Graph

  state = { pageVisible: true, infinite: true }

  componentDidMount() {
    const graph = (this.graph = new Graph(this.container, {
      infinite: this.state.infinite,
      pageVisible: this.state.pageVisible,
      pageFormat: {
        width: 800,
        height: 960,
      },
    }))

    new MiniMap(graph, {
      container: this.minimapContainer,
    })

    graph.batchUpdate(() => {
      const node1 = graph.addNode({
        x: 60,
        y: 60,
        width: 80,
        height: 30,
        label: 'Hello',
      })
      const node2 = graph.addNode({
        x: 240,
        y: 240,
        width: 80,
        height: 30,
        label: 'World',
      })
      graph.addEdge({ label: 'Edge Label', source: node1, target: node2 })
    })
  }

  onPageViewChanged = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked
    this.graph.setPageVisible(checked)
    this.setState({ pageVisible: checked })
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  refMiniMap = (container: HTMLDivElement) => {
    this.minimapContainer = container
  }

  render() {
    return (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ paddingBottom: 24 }}>
          <Checkbox
            onChange={this.onPageViewChanged}
            checked={this.state.pageVisible}
          >
            Page View
          </Checkbox>
        </div>
        <div
          ref={this.refContainer}
          className="graph"
          style={{ backgroundColor: '#f8f9fa' }}
        />
        <div
          ref={this.refMiniMap}
          style={{
            width: 300,
            height: 200,
            position: 'absolute',
            top: 24,
            right: 24,
            border: '1px solid #e9e9e9',
            zIndex: 999,
            background: '#ccc',
            boxShadow: '0 0 2px 1px #e9e9e9',
          }}
        />
      </div>
    )
  }
}
