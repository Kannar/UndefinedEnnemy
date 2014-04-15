function findPath()
{
	var grid = new PF.Grid(13, 10, matrix);
	grid.setWalkableAt(0, 1, false);
	var finder = new PF.AStarFinder();
	var gridBackup = grid.clone();
	path = finder.findPath(click1.x, click1.y, click2.x, click2.y, grid);
	grid = gridBackup;
	return path;
}
function drawPath()
{
	var grid = new PF.Grid(13, 10, matrix);
	grid.setWalkableAt(0, 1, false);
	var finder = new PF.AStarFinder();
	var gridBackup = grid.clone();
	path = finder.findPath(click1.x, click1.y, pos2.x, pos2.y, grid);
	grid = gridBackup;
	return path;
}