import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import CodeBox from '../CodeBox';
import makeId from '../../utils/makeId';

import styles from 'index.module.scss';

const Type = ({type}) => {
    if (type === 'string' || type === 'integer') {
        return type;
    }
    if (typeof type === 'object') {
        if (type.type === 'list') {
            return (
                <Fragment>
                    list&nbsp;
                    <Type type={type.of} />
                </Fragment>
            );
        }
        return (
            <Fragment>
                <Type type={type.type} /> (<Type type={type.of} />)
            </Fragment>
        );
    }
    return <a href={'#' + makeId(type)}>{type}</a>;
};

const DocSection = ({
    name,
    description,
    exampleRequest,
    exampleResponse,
    responseModels,
    rootUrl,
    baseUrl,
}) => (
    <Fragment>
        <h3 className={styles.section_name} id={makeId(name)}>
            {name}
        </h3>
        {description && (
            <p
                dangerouslySetInnerHTML={{
                    __html: marked(description),
                }}
            />
        )}
        <p className={styles.resource_url}>GET {baseUrl + exampleRequest}</p>
        <CodeBox language="json" small title="Example Response">
            {JSON.stringify(exampleResponse, null, 2).replace(
                /\$BASE_URL/g,
                rootUrl + baseUrl
            )}
        </CodeBox>
        {responseModels.map(model => (
            <Fragment key={model.name}>
                <h4 className={styles.model_name} id={makeId(model.name)}>
                    {model.name}
                </h4>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.name_column}>Name</th>
                            <th className={styles.desc_column}>Description</th>
                            <th className={styles.type_column}>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {model.fields.map(field => (
                            <tr key={field.name}>
                                <td>{field.name}</td>
                                <td>{field.description}</td>
                                <td>
                                    <Type type={field.type} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        ))}
    </Fragment>
);

// Recursive field types definition
const fieldTypes = [PropTypes.string];
const typeShape = {
    type: PropTypes.string,
    of: PropTypes.oneOfType(fieldTypes),
};
fieldTypes.push(PropTypes.shape(typeShape));

DocSection.propTypes = {
    baseUrl: PropTypes.string.isRequired,
    rootUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    exampleRequest: PropTypes.string.isRequired,
    exampleResponse: PropTypes.object.isRequired,
    responseModels: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            fields: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    description: PropTypes.string.isRequired,
                    type: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.shape(typeShape),
                    ]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
};

export default DocSection;
