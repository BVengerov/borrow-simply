<?php

class Item
{
	public $id;
	public $name;
	public $type;
	public $os;
	public $display;
	public $resolution;
	public $home;
	public $status;
	public $comment;
	public $history;

	public function __construct(
	$id = 0,
	$name = '',
	$type = '',
	$os = '',
	$display = '',
	$resolution = '',
	$home = '',
	$status = '',
	$date = '',
	$comment = '',
	$history = ''
	)
	{
		$this->id = $id;
		$this->name = $name;
		$this->type = $type;
		$this->os = $os;
		$this->display = $display;
		$this->resolution = $resolution;
		$this->home = $home;
		$this->status = $status;
		$this->date = $date;
		$this->comment = $comment;
		$this->history = $history;
	}
}