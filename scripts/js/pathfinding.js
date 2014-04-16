function findPath(x,y)
{
	var grid = new PF.Grid(mapParams.nbCaseMapY, mapParams.nbCaseMapX, matrix);
	grid.setWalkableAt(0, 1, false);
	var finder = new PF.AStarFinder();
	var gridBackup = grid.clone();
	path = finder.findPath(x,y, mouseVars.mapPosX, mouseVars.mapPosY, grid);
	grid = gridBackup;
	return path;
}
function drawPath(x,y)
{
	var grid = new PF.Grid(mapParams.nbCaseMapY, mapParams.nbCaseMapX, matrix);
	grid.setWalkableAt(0, 1, false);
	var finder = new PF.AStarFinder();
	var gridBackup = grid.clone();
	path = finder.findPath(x,y, mouseVars.mapPosX+mapParams.viewX, mouseVars.mapPosY+mapParams.viewY, grid);
	grid = gridBackup;
	return path;
}