import React from 'react';

const cx = (...classNames: Array<string | undefined | false>) => classNames.filter(cn => !!cn).join(' ');

export const useRenderers = () => ({
	renderItemTitle: (title: string) => {
		return (
			<span className="tree-item-title">{title}</span>
		)
	},

	renderItemArrow: (item, expanded: boolean) => (
		<div className='tree-item-arrow'>
			{ item.children.length > 0 &&
			 	( expanded ? (
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 16 16"
						enableBackground="new 0 0 16 16"
						xmlSpace="preserve"
					>
						<g>
						<g>
							<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M12,5c-0.28,0-0.53,0.11-0.71,0.29L8,8.59L4.71,5.29C4.53,5.11,4.28,5,4,5
							C3.45,5,3,5.45,3,6c0,0.28,0.11,0.53,0.29,0.71l4,4C7.47,10.89,7.72,11,8,11s0.53-0.11,0.71-0.29l4-4C12.89,6.53,13,6.28,13,6
							C13,5.45,12.55,5,12,5z"
							className="rct-tree-item-arrow-path"
							/>
						</g>
						</g>
					</svg>
					) : (
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 16 16"
						enableBackground="new 0 0 16 16"
						xmlSpace="preserve"
					>
						<g>
						<g>
							<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M10.71,7.29l-4-4C6.53,3.11,6.28,3,6,3C5.45,3,5,3.45,5,4
							c0,0.28,0.11,0.53,0.29,0.71L8.59,8l-3.29,3.29C5.11,11.47,5,11.72,5,12c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l4-4
							C10.89,8.53,11,8.28,11,8C11,7.72,10.89,7.47,10.71,7.29z"
							className="rct-tree-item-arrow-path"
							/>
						</g>
						</g>
					</svg>
				))}
		</div>
	),

	renderTreeContainer: ({children}) => {
		return (
			<div
				className={cx(
					'tree-root'
				)}
			>
				<div>{ children }</div>
			</div>
		)
	},

	renderItem: ({item, depth, title, arrow, children}) => {
		return (
			<li
				className={cx(
					'tree-item-li',
					children.length > 0 && 'tree-item-li-hasChildren'
				)}
			>
				<div
					style={{ paddingLeft: `${(depth + 1) * 10}px`}}
					className={cx(
						'tree-item-title-container',
						children.length > 0 && 'tree-item-title-container-hasChildren'
					)}
				>
					{arrow}
					{ title }
				</div>
				<ul className='tree-items-container'>
					{ children }
				</ul>
			</li>
		)
	}
})