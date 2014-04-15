function findPath()
{
	var grid = new PF.Grid(17, 14, matrix);
	grid.setWalkableAt(0, 1, false);
	var finder = new PF.AStarFinder();
	var gridBackup = grid.clone();
	path = finder.findPath(mouseVars.selectCase1.x, mouseVars.selectCase1.y, mouseVars.mapPosX, mouseVars.mapPosY, grid);
	grid = gridBackup;
	return path;
}
function drawPath()
{
	var grid = new PF.Grid(17, 14, matrix);
	grid.setWalkableAt(0, 1, false);
	var finder = new PF.AStarFinder();
	var gridBackup = grid.clone();
	path = finder.findPath(mouseVars.selectCase1.x, mouseVars.selectCase1.y, mouseVars.mapPosX, mouseVars.mapPosY, grid);
	grid = gridBackup;
	return path;
}