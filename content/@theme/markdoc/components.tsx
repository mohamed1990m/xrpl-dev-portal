import * as React from 'react';
// @ts-ignore
import dynamicReact from '@markdoc/markdoc/dist/react';
import { usePageSharedData } from '@portal/hooks';
import { Link } from '@portal/Link';
import { idify } from '../helpers';

export {default as XRPLoader} from '../components/XRPLoader';


export function IndexPageItems() {
    const data = usePageSharedData('index-page-items') as any[];
    return (
        <div className="children-display">
            <ul>
              {data?.map((item: any) => (
                <li className="level-1" key={item.slug}>
                  <Link to={item.slug}>{item.title}</Link>
                  <p className='class="blurb child-blurb'>{item.blurb}</p>
                </li>
              ))}
            </ul>
        </div>
  );
}

export function InteractiveBlock(props: { children: React.ReactNode; label: string; steps: string[] }) {
  const stepId = idify(props.label);

  return (
    <div className="interactive-block" id={'interactive-' + stepId}>
      <div className="interactive-block-inner">
        <div className="breadcrumbs-wrap">
          <ul
            className="breadcrumb tutorial-step-crumbs"
            id={'bc-ul-' + stepId}
            data-steplabel={props.label}
            data-stepid={stepId}
          >
            {props.steps?.map((step, idx) => {
              const iterStepId = idify(step).toLowerCase();
              let className = `breadcrumb-item bc-${iterStepId}`;
              if (idx > 0) className += ' disabled';
              if (iterStepId === stepId) className += ' current';
              return (
                <li className={className} key={iterStepId}>
                  <a href={`#interactive-${iterStepId}`}>{step}</a>
                </li>
                );
            })}
          </ul>
        </div>
        <div className="interactive-block-ui">{dynamicReact(props.children, React, {})}</div>
      </div>
    </div>
    );
}

export function RepoLink(props: {
        children: React.ReactNode;
        path: string;
        github_fork: string;
        github_branch: string
    }) {
    const treeblob = props.path.indexOf(".") >= 0 ? "blob/" : "tree/"
    const sep = props.github_fork[-1] == "/" ? "" : "/"
    const href = props.github_fork+sep+treeblob+props.github_branch+"/"+props.path

    return (
        <Link to={href}>{dynamicReact(props.children, React, {})}</Link>
    )
}

export function CodePageName(props: {
    name: string;
}) {
    return (
        <code>{props.name}</code>
    )
}
