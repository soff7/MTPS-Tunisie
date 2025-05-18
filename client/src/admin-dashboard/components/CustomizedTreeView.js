import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, useTreeItem } from '@mui/x-tree-view/TreeItem';
import { useTheme } from '@mui/material/styles';

const ITEMS = [
  {
    id: '1',
    label: 'Website',
    children: [
      { id: '1.1', label: 'Home', color: 'green' },
      { id: '1.2', label: 'Pricing', color: 'green' },
      { id: '1.3', label: 'About us', color: 'green' },
      {
        id: '1.4',
        label: 'Blog',
        children: [
          { id: '1.1.1', label: 'Announcements', color: 'blue' },
          { id: '1.1.2', label: 'April lookahead', color: 'blue' },
          { id: '1.1.3', label: "What's new", color: 'blue' },
          { id: '1.1.4', label: 'Meet the team', color: 'blue' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Store',
    children: [
      { id: '2.1', label: 'All products', color: 'green' },
      {
        id: '2.2',
        label: 'Categories',
        children: [
          { id: '2.2.1', label: 'Gadgets', color: 'blue' },
          { id: '2.2.2', label: 'Phones', color: 'blue' },
          { id: '2.2.3', label: 'Wearables', color: 'blue' },
        ],
      },
      { id: '2.3', label: 'Bestsellers', color: 'green' },
      { id: '2.4', label: 'Sales', color: 'green' },
    ],
  },
  { id: '4', label: 'Contact', color: 'blue' },
  { id: '5', label: 'Help', color: 'blue' },
];

function DotIcon({ color }) {
  return (
    <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
      <svg width={6} height={6}>
        <circle cx={3} cy={3} r={3} fill={color} />
      </svg>
    </Box>
  );
}

DotIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

function CustomLabel({ color, expandable, children, ...other }) {
  const theme = useTheme();
  const colors = {
    blue: (theme.vars || theme).palette.primary.main,
    green: (theme.vars || theme).palette.success.main,
  };

  const iconColor = color ? colors[color] : null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} {...other}>
      {iconColor && <DotIcon color={iconColor} />}
      <Typography
        className="labelText"
        variant="body2"
        sx={{ color: 'text.primary' }}
      >
        {children}
      </Typography>
    </Box>
  );
}

CustomLabel.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['blue', 'green']),
  expandable: PropTypes.bool,
};

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const {
    itemId,
    label,
    color,
    children,
    ...other
  } = props;

  return (
    <TreeItem
      ref={ref}
      nodeId={itemId}
      label={<CustomLabel color={color}>{label}</CustomLabel>}
      TransitionComponent={TransitionComponent}
      {...other}
    >
      {children}
    </TreeItem>
  );
});

CustomTreeItem.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The color of the dot.
   */
  color: PropTypes.oneOf(['blue', 'green']),
  /**
   * The id of the item.
   */
  itemId: PropTypes.string.isRequired,
  /**
   * The label of the item.
   */
  label: PropTypes.node,
};

const renderTree = (nodes) => {
  return Array.isArray(nodes) ? (
    nodes.map((node) => (
      <CustomTreeItem key={node.id} itemId={node.id} label={node.label} color={node.color}>
        {node.children && renderTree(node.children)}
      </CustomTreeItem>
    ))
  ) : (
    <CustomTreeItem itemId={nodes.id} label={nodes.label} color={nodes.color}>
      {nodes.children && renderTree(nodes.children)}
    </CustomTreeItem>
  );
};

export default function CustomizedTreeView() {
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Product tree
        </Typography>
        <TreeView
          aria-label="pages"
          multiSelect
          defaultExpanded={['1', '1.1']}
          defaultSelected={['1.1', '1.1.1']}
          sx={{
            m: '0 -8px',
            pb: '8px',
            height: 'fit-content',
            flexGrow: 1,
            overflowY: 'auto',
          }}
        >
          {renderTree(ITEMS)}
        </TreeView>
      </CardContent>
    </Card>
  );
}