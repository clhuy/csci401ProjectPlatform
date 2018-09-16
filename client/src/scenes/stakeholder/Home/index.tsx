import * as React from 'react';
import {
    Panel,
    Table,
    Alert,
    Button
} from 'react-bootstrap';
import {
    LinkContainer
} from 'react-router-bootstrap';
import { getApiURI } from '../../../common/server';
const viewIcon = require('../../../svg/viewIcon.svg');
const style = {
    width: 1000,
    float: 'none',
    margin: 'auto'
};
interface IProject {
    projectId: number;
    projectName: string;
    statusId: number;
}

interface IHomeState {
    projects: Array<{}>;
    isLoading: Boolean;
}

interface IHomeProps {
}

class StakeholderHome extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            projects: [],
            isLoading: true
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            const response = await fetch(getApiURI('/projects/' + sessionStorage.getItem('email')));
            const data = await response.json();

            this.setState({
                projects: data,
                isLoading: false
            });
        } catch (e) {
            console.error(e);
        }
    }

    getStatus(statusId: number) {
        if (statusId === 1) {
            return 'Pending Approval';
        } else if (statusId === 2) {
            return 'Approved';
        } else if (statusId === 3) {
            return 'Rejected';
        } else {
            return 'Changes Requested';
        }
    }

    render() {
        const { projects, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div style={style as any}>

                <h3>Welcome back!</h3>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Your Projects</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Table>
                            <thead>
                                <th>Project</th>
                                <th>Status</th>
                                <th>View/Edit</th>
                            </thead>
                            <tbody>
                                {projects.map((project: IProject, index: number) =>
                                    <tr key={project.projectId}>
                                        <td>{project.projectName}</td>
                                        <td>{this.getStatus(project.statusId)}</td>
                                        <td>
                                            <LinkContainer to={{ pathname: 'stakeholder/project/' + project.projectId }}>
                                                <img src={viewIcon} />
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default StakeholderHome;