import React from 'react';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { connect } from 'react-redux';

import * as Actions from '../../actions';
import ImageDeleteIcon from '../ImageDeleteIcon';

const SortableItem = SortableElement(({ image, index }) => <img src={image.url} height="100%" width="100%" />);

const SortableList = SortableContainer(({ images }) => (
  <div className="row p-2">
    {images.map((image, index) => (
      <div className="d-inline-block col-6 col-sm-6 col-md-4 col-lg-4 p-0 position-relative" key={image.url}>
        <SortableItem index={index} image={image} />
        <ImageDeleteIcon index={index} />
      </div>
    ))}
  </div>
));

class SortableComponent extends React.Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { images, sortImages } = this.props;
    sortImages({ data: arrayMove(images.data, oldIndex, newIndex) });
  };

  render() {
    const { images } = this.props;
    return (
      <div>
        <SortableList axis="xy" images={images.data} onSortEnd={this.onSortEnd} />
      </div>
    );
  }
}

const mapStateToProps = ({ images }) => ({
  images,
});

const mapDispatchToProps = dispatch => ({
  sortImages: payload => dispatch(Actions.sortImages(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SortableComponent);
