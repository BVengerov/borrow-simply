<?php

class Item
{
	public $id;
	public $name;
	public $os;
	public $status;
	public $comment;

	public function __construct(
	$id = 0,
	$name = '',
	$os = '',
	$status = '',
	$comment = ''
	)
	{
		$this->id = $id;
		$this->name = $name;
		$this->os = $os;
		$this->status = $status;
		$this->comment = $comment;
	}
}