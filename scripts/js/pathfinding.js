function findPath(x,y,x2,y2,layer)
{
	var grid = new PF.Grid(mapParams.nbCaseMapX, mapParams.nbCaseMapY, map[layer]);
	grid.setWalkableAt(0, 1, false);
	var finder = new PF.AStarFinder();
	var gridBackup = grid.clone();
	path = finder.findPath(x,y,x2,y2,grid);
	grid = gridBackup;
	return path;
}
